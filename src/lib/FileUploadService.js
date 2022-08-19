const multer = require('multer')
const { diskStorage, StorageEngine } = multer
const path = require('path');


class FileUploadService {
    storage = StorageEngine
    multer
    MIME_TYPE_IMAGE = {
        'image/png': 'image/png',
        'image/jpeg': 'image/jpeg',
        'image/jpg': 'image/jpg'
    }

    MIME_TYPE_IMAGE = {
        'image/png': 'image/png',
        'image/jpeg': 'image/jpeg',
        'image/jpg': 'image/jpg'
    }

    constructor() {
        this.storage = diskStorage({
            destination: this.destination, // Thư mục đích
            filename: this.convertFileName,// Tên mong muốn
            fileFilter: this.fileFilter
        })
    }

    destination = (req, file, callback) => {
        const type = this.getTypeFile(file)
        // const  projectFolder = file.fieldname
        let folder = this.chooseFolder(type)
        callback(null, path.join(__dirname,'../', 'public', folder))
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
        const filenameResult = fileNameFormat + "." + this.getExtensionname(file)
        callback(null, filenameResult)
    }

    getExtensionname = (file) => {
        const idxDotLast = file.originalname.lastIndexOf('.')
        const extName = file.originalname.substr(idxDotLast + 1, 4)
        return extName
    }


    // Filter: fileSize, filename,... 
    // Bộ lọc kích hoạt trong: multer({fileFilter: fileFilter })
    fileFilter = (req, file, callback) => {
        if (this.MIME_TYPE_IMAGE[file.mimetype] === undefined) {
            return callback(new Error('File Extension Invalid!!!'))
        }

        callback(null, false)
    }


    getTypeFile = (file) => {
        let type = null
        const fileMimetype = file.mimetype.substr(0, file.mimetype.lastIndexOf('/'))
        // console.log("1: ", fileMimetype);
        // console.log("2: ", this.getExtensionname(file))

        if ((this.MIME_TYPE_IMAGE[file.mimetype] !== undefined) ||
            (fileMimetype == 'image')
        ) {
            type = 'image'
        }

        if ((this.getExtensionname(file) == 'docx') ||
            (this.getExtensionname(file) == 'doc') &&
            fileMimetype == 'application') {
            type = "docx"
        }

        if ((this.getExtensionname(file) == 'xlsx') ||
            (this.getExtensionname(file) == 'xls') &&
            fileMimetype == 'application') {
            type = "xlsx"
        }

        if ((this.getExtensionname(file) == 'mp4') &&
            (fileMimetype == 'video')
        ) {
            type = "video"
        }

        return type

    }

    chooseFolder = (type)=>{
        let  folder = null
        switch (type) {
            case 'image':
                folder = type
                break;
            case 'xlsx':
                folder = type
                break;
            case 'docx':
                folder = type
                break;
            case 'video':
                folder = type
                break;
            default:
                folder = 'other'
                break;
        }

        return folder
    }
}

module.exports = new FileUploadService().storage