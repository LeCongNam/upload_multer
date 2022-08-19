const sharp = require('sharp');
const path = require('path');

class ScaleImage {
    resizeScaleDown(file, {
        width,
        height,
        pathInput
    }) {
        return new Promise((resolve, reject) => {
            if (!width || !height || !pathInput || !file) {
                reject('Missing params input')
            }
            sharp(file.path)
            .resize(width, height)
            .jpeg({ quality: 90 })
            .toFile(path.join(pathInput,'/down/', `${width}x${height}-${file.filename}`), (err) => {
                if (err) {
                    reject(`${err}`)
                }
                const pathResult = path.join(pathInput, 'down' ,`${width}x${height}-${file.filename}`)
                const fileName =`${width}x${height}-${file.filename}`
                    resolve({
                        fileName: fileName,
                        pathResult
                    })
                })
        })
    }


    resizeScaleUp(file, {
        width,
        height,
        to,
        pathInput
    }) {
        return new Promise((resolve, reject) => {
            if (!width || !height || !to || !pathInput || !file) {
                reject('Missing params input')
            }
            sharp(file.file.path)
                .resize(width, height)
                .jpeg({ quality: to })
                .toFile(path.join(pathInput,'/up/',`${width}x${height}-${file.filename}`), (err) => {
                    if (err) {
                        reject(`${err}`)
                    }
                    resolve('success')
                })
        })
    }

}

module.exports = ScaleImage