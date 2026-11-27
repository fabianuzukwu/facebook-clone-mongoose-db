const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/email')
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken')

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

        const otp = otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets:false, specialChars: false})
        const data = {
            fullName,
            email: email.toLowerCase(),
            gender,
            password: hashedPassword,
            age,
            otp
        }

        
        const newUser = await userModel.create(data)
        const emailContent = {
            name: newUser.fullName,
            email: newUser.email,
            subject: 'Welcome to Zanzibar',
            htmlContent: `<html><head></head><body><p>Hello ${newUser.fullName},</p>We are thrilled to have you onboard, Please use the OTP below to verify your account. <br> ${otp} </p></body></html>`
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

        if (user.isVerified == false) {
            return res.status(400).json({
                message: "User not verified, please check your email for the OTP sent to you."
            })
        }

        const token = await jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {expiresIn: '30 minutes'})

        res.status(200).json({
            message: 'login successful',
            data: user,
             token
        })
    } catch (error) {
         res.status(500).json({
            message: error.message 
        })
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await userModel.findOne({email: email.toLowerCase()})

         if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (user.otp !== otp ) {
            return res.status(400).json({
                message: 'Invalid OTP'
            }) 
        }

        user.isVerified = true;
        user.status = "Active"
        user.otp = null

        //Save the changes to the database
        await user.save()

        res.status(200).json({
            message: 'Account Verified successful',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message 
        }) 
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body
        const user = await userModel.findOne({email: email.toLowerCase()})

         if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})

        const emailContent = {
            subject: 'Password Reset',
            email,
            name: user.fullName,
            htmlContent: `<html><head></head><body><p>Hello ${user.fullName},</p>Your password reset was initialized, below is your OTP. If you did not initiate this request, please disregard this email <br> ${otp} </p></body></html>`

        }

        user.otp = otp
        await sendEmail(emailContent)
        await user.save()

        res.status(200).json({
            message: "Forgot Password is successful"
        })
    } catch (error) {
         res.status(500).json({
            message: error.message 
        }) 
    }
}

exports.resetPassword = async (req, res) => {
    try {
       const {email, otp, newPassword, confirmPassword}  = req.body;

       const user = await userModel.findOne({email: email.toLowerCase()});
       if (user == null) {
        return res.status(404).json({
            message: 'User not found'
        })
       }

       if (user.otp !== otp) {
        return res.status(401).json({
            message: 'Invalid OTP'
        })
       }

       if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: 'Confirm Password does not match'
        })
       }

       const saltedRounds = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(newPassword, saltedRounds)

       user.password = hashedPassword
       user.otp = null
       await user.save()

       res.status(200).json({
        message: 'Password reset successfully'
       })
    } catch (error) {
          res.status(500).json({
            message: error.message 
        }) 
    }
}

