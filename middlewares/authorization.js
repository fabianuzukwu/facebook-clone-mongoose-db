const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

exports.authenticate = async (req, res, next) => {
    try {
        const auth = req.headers.authorization
        if (!auth) {
            return res.status(401).json({
                message: 'Auth not found'
            })
        }

        const token = auth.split(' ')[1]

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await userModel.findById(decodedToken.id)
        if (!user) {
            return res.status(401).json({
                message: 'Auth Failed: User not found'
            })
        }

        req.user = decodedToken
        next()
    } catch (error) {
       res.status(500).json({
        message: error.message
       })
    }
}