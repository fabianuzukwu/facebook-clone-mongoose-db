const router = require('express').Router()
const {signUp, getAllUsers, getOneUser, updateUser, login, verifyEmail, forgotPassword, resetPassword, resendOtp, changePassword} = require('../controllers/user.js');
const { authenticate } = require( '../middlewares/authorization.js' );

router.post('/users/signup', signUp)
router.post('/users/verifyOtp', verifyEmail)
router.post('/users/login', login)
router.post('/users/forgot-password', forgotPassword)
router.post('/users/reset-password', resetPassword)
router.get('/users', authenticate, getAllUsers)
router.get('/users/:id',getOneUser)
router.patch('/users/:id', updateUser)
router.post('/users/resendOtp', resendOtp)
router.post('/users/changePassword', authenticate, changePassword)

module.exports = router