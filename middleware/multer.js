const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname)
    }
})

// const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb({ message: 'Unsupported file format' }, false)
    }
}

const uploadMiddleware = multer({storage, fileFilter, limits: {fileSize: 5000000}})

module.exports = uploadMiddleware