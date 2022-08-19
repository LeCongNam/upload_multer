const sharp = require('sharp');
const path = require('path');
const Help = require('./help/helper');
const fs = require('fs');

class ScaleImage {
    help
    constructor() {
        this.help = new Help()
    }

    resizeScaleDown(file, {
        width,
        height,
        pathInput
    }) {
        
        return new Promise( async (resolve, reject) => {
            if (!width || !height || !pathInput || !file) {
                reject('Missing params input')
            }

            try {
               // đường dẫn + ten file upload  sau khi scale
            const pathScaleUpload = path.join(pathInput, '/down/', `${width}x${height}-${file.filename}`) 

            // Kiểm tra folder và tạo nếu chưa có
            const folderUploadResize = path.join(pathInput, '/down/')
            const isFolderExits = await this.help.findFolderExits(folderUploadResize)
            
            if (!isFolderExits) {
                fs.mkdirSync(folderUploadResize)
            }

            // Thư viện
                sharp(file.path)
                    .resize(width, height)
                    .jpeg({ quality: 90 })
                    .toFile(pathScaleUpload, (err) => {
                        if (err) {
                            return reject(`${err}`)
                        }
                        const fileName = `${width}x${height}-${file.filename}`
                        return resolve({
                            fileName: fileName,
                            pathScaleUpload
                        })
                    })
            } catch (error) {
                console.log(error);
            }
        })
    }


    resizeScaleUp(file, {
        width,
        height,
        pathInput
    }) {
        return new Promise( async (resolve, reject) => {
            if (!width || !height || !pathInput || !file) {
                reject('Missing params input')
            }

            try {
                // đường dẫn + ten file upload  sau khi scale
                const pathScaleUpload = path.join(pathInput, '/up/', `${width}x${height}-${file.filename}`) 

                // Kiểm tra folder và tạo nếu chưa có
                const folderUploadResize = path.join(pathInput, '/up/')
                const isFolderExits = await this.help.findFolderExits(folderUploadResize)
                
                if (!isFolderExits) {
                    fs.mkdirSync(folderUploadResize)
                }

                // Thư viện
                sharp(file.path)
                    .resize(width, height)
                    .jpeg({ quality: 90 })
                    .toFile(pathScaleUpload, (err) => {
                        if (err) {
                            return reject(`${err}`)
                        }
                       
                        const fileName = `${width}x${height}-${file.filename}`
                        return resolve({
                            fileName: fileName,
                            pathScaleUpload
                        })
                    })
            } catch (error) {
                console.log(error);
            }
        })
    }

}

module.exports = ScaleImage