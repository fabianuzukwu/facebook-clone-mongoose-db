const router = require('express').Router()
const {signUp, getAllUsers, getOneUser, updateUser, login} = require('../controllers/user.js')

router.post('/users', signUp)
router.post('/users/login', login)
router.get('/users', getAllUsers)
router.get('/users/:id',getOneUser)
router.patch('/users/:id', updateUser)

module.exports = router