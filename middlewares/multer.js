const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const date = Date.now()
        const randNumbers = Math.floor(Math.random() * 1E8);
        const ext = file.originalname.split('.').pop()
        const filename = `IMG_${date}_${randNumbers}.${ext}`
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true)  
    } else {
        cb(new Error('Only Images and Videos allowed'))
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5
}

const upload = multer({
    storage,
    limits,
    fileFilter
})

module.exports = upload