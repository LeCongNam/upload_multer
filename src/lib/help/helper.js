const CONSTANTS = require('./constant');
const fs = require('fs');

class Helper {
      findFolderExits = (pathUpload) => {
        return new Promise((resolve, reject) => {
            fs.readdir(pathUpload, { withFileTypes: true }, (err, files) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }

    getTypeFile = (file) => {
        let type = null
        const fileMimetype = file.mimetype.substr(0, file.mimetype.lastIndexOf('/'))
        // console.log("1: ", fileMimetype);
        // console.log("2: ", this.getExtensionname(file))

        if ((CONSTANTS[file.mimetype] !== undefined) ||
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
            (this.getExtensionname(file) == 'csv') &&
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


    getExtensionname = (file) => {
        const idxDotLast = file.originalname.lastIndexOf('.')
        const extName = file.originalname.substr(idxDotLast + 1, 4)
        return extName
    }

    
    chooseFolder = (type) => {
        let folder = null
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


module.exports = Helper