const router = require('express').Router()
const { createPost, getOnePost } = require('../controllers/post')
const upload = require('../middlewares/multer')

router.post('/posts/:userId', upload.array('media', 15), createPost)
router.post('/posts/:id', getOnePost)

module.exports = router