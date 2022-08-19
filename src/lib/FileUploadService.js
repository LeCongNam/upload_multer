const multer = require('multer')
const { diskStorage, StorageEngine } = multer
const path = require('path');
const fs = require('fs')
const Help = require('./help/helper');
const ScaleImage = require('./ScaleImage');


class FileUploadService {
    storage
    multer
    help
    scaleImage

    constructor() {
        this.storage = diskStorage({
            destination: this.destination, // Thư mục đích
            filename: this.convertFileName,// Tên mong muốn
            fileFilter: this.fileFilter // Kích hoạt filter mong muốn
        })
        this.help = new Help()
        this.scaleImage = new ScaleImage()
    }

    destination = async (req, file, callback) => {
        try {
            //****************** Test Scale auto
                // const pathInp = path.join(__dirname, 'public', 'author')
                // const scale = await this.scaleImage.resizeScaleDown(file, { width: 300, height: 300, pathInput: pathInp })
                // console.log(scale);
            // ****************** Test Scale Auto
            const type = this.help.getTypeFile(file)
            let folder = this.help.chooseFolder(`${type}`)
            const pathUpload = path.join(__dirname, '../', 'public', 'author', folder)
            const folderExits = await this.help.findFolderExits(pathUpload)
            if (!folderExits) {
                fs.mkdirSync(pathUpload)
            }
            callback(null, pathUpload)
        } catch (error) {
            console.log("tesst", error)
            callback(null, false)
        }

    }

    convertFileName = (req, file, callback) => {
        // console.log("fileInfo: ", file);
        const idxDotLast = file.originalname.lastIndexOf('.') // ex: file.Name.html => return index = 10 
        const fileNameClient = file.originalname.substr(0, idxDotLast)
        //1. progress replace special characters by underscore
        const fileNamFilter = fileNameClient.replace(/[^\w\s]/gi, '_')
        // 2. convert to lowerCase + add unix time
        const fileNameFormat = fileNamFilter.toLowerCase() + "_" + Date.now()
        // 3. get Extension name
        const filenameResult = fileNameFormat + "." + this.help.getExtensionname(file)
        callback(null, filenameResult)
    }

    // Filter: fileSize, filename,... 
    // Bộ lọc kích hoạt trong: multer({fileFilter: fileFilter })
    fileFilter = (req, file, callback) => {
        if (MIME_TYPE_IMAGE[file.mimetype] === undefined) {
            return callback(new Error('File Extension Invalid!!!'))
        }

        callback(null, false)
    }

}

module.exports = new FileUploadService().storage