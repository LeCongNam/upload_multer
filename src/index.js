const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const db = require('./database/connectDB')
db.connect()

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'src', 'public')))
app.use(upload.single('avatar'));

app.get('/upload', (req, res) => {
    return res.json({
        message: "ok"
    })
})

app.post('/upload/one', (req, res) => {
    const file = req.file
    const idxDotLast = file.originalname.lastIndexOf('.') // ex: file.Name.html => return index = 10 
    const fileNameClient = file.originalname.substr(0, idxDotLast)
    //1. progress replace special characters by underscore
    const fileNamFilter = fileNameClient.replace(/[^\w\s]/gi, '_')
    // 2. convert to lowerCase + add unix time
    const fileNameFormat = fileNamFilter.toLowerCase() + "_" + Date.now()
    // 3. get Extension name
    const extName = file.originalname.substr(idxDotLast, 4)
    const filenameResult = fileNameFormat + extName

    return res.json({
        message: "ok",
        filenameResult
    })
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