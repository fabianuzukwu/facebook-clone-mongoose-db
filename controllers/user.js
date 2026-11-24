const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/email')

exports.signUp = async (req, res) => {
    try{
        const { fullName, email, gender, password, age} = req.body;
        console.log(fullName)
        const user = await userModel.findOne({email: email.toLowerCase()})
        if(user){
            return res.status(400).json({
                message: `User with Email: ${email} already exists`
            })
        }

        const saltedRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltedRounds)

        const data = {
            fullName,
            email: email.toLowerCase(),
            gender,
            password: hashedPassword,
            age
        }

        
        const newUser = await userModel.create(data)
        const emailContent = {
            name: newUser.fullName,
            email: newUser.email,
            subject: 'Welcome to Zanzibar',
            htmlContent: `<html><head></head><body><p>Hello ${newUser.fullName},</p>This is my first transactional email sent from Brevo.</p></body></html>`
        }
        await sendEmail(emailContent)

        res.status(201).json({
            message: 'User created successfully',
            data: newUser
        })
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json({
            message: `All users found and the Total is: ${users.length}`,
            data: users
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await userModel.findById(id).populate('posts')

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User found',
            data: user
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
      const {id} = req.params
      const { fullName, email, gender, password, age } = req.body

      const user = await userModel.findById(id)
      if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
      }

      const data = {
            fullName,
            gender,
            password,
            age
        }

        if (email && email !== user.email) {
            const existingEmail = await userModel.findOne({email: email.toLowerCase()})
            if (existingEmail) {
                return res.status(400).json({
                    message: 'Email already in use'
                })
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, data, {new : true})
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email: email.toLowerCase()})

         if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect == false) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        res.status(200).json({
            message: 'login successful',
            data: user
        })
    } catch (error) {
         res.status(500).json({
            message: error.message 
        })
    }
}