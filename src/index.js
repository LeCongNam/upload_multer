const express = require('express')
const path = require('path')
const morgan = require('morgan')
var multer = require('multer')


const ScaleImage = require('./lib/ScaleImage');
const scaleImage = new ScaleImage()

const db = require('./database/connectDB')
const FileUploadService = require('./lib/FileUploadService')

db.connect()
const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(morgan('dev'))

app.post('/upload/multiple', (req, res) => {
    multer({ storage: FileUploadService })
        h
        (req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("Multer Upload Faile: ", err);
                // A Multer error occurred when uploading.
                return res.json({
                    message: "Multer Upload Fail",
                    err
                })
            } else if (err) {
                console.log("Unknown Upload Faile: ", err);
                // An unknown error occurred when uploading.
                return res.json({
                    message: "unknown Upload Fail",
                    err
                })
            }
            // Successfully
            return res.json({
                message: "ok",
            })
        })
})

app.post('/upload/one/scale-down',
    multer({ storage: FileUploadService, fileFilter: FileUploadService.fileFilter }).single('photos'),
    async (req, res) => {
        try {
            const pathInp = path.join(__dirname, 'public', 'author')
            const scale = await scaleImage.resizeScaleDown(req.file, { width: 300, height: 300, pathInput: pathInp })
            // console.log(scale);
            
            return res.json({
                message: "ok",
            })
        } catch (error) {
            console.log(error);
            return res.json({
                message: error || 'Resize Failed',
            })
        }
    })


app.post('/upload/one/scale-up',
multer({ storage: FileUploadService, fileFilter: FileUploadService.fileFilter }).single('photos'),
async (req, res) => {
    try {
        const pathInp = path.join(__dirname, 'public', 'author')
        const scale = await scaleImage.resizeScaleUp(req.file, { width: 300, height: 300, pathInput: pathInp })
        console.log(scale);
        // Successfully
        return res.json({
            message: "ok",
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: error || 'Resize Failed',
        })
    }
})


app.get('/', (req, res) => {
    return res.json({
        message: 'Home Page'
    })
})

app.use((req, res, next) => {
    if (res.statusCode == 404) {
        return res.status(404).json('404 not found')
    }
    next()
})

app.use((err, req, res) => {
    console.log(err.message);
    res.status(500)
    return res.json('Something Error')
})

app.listen(3000, () => {
    console.log('Server is Running 3000');
})