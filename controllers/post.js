const postModel = require('../models/post')
const userModel = require('../models/user')
const fs = require('fs')
const cloudinary = require('../config/cloudinary')

exports.createPost = async (req, res) => {
    try {
        const { userId } = req.params
        const {content} = req.body
        const files =  req.files
        const media = []
        if ( files.length > 0) {
           const invalidFiles = files.map((file) =>{
                file.mimetype.startsWith('application/pdf')
            })
            if (invalidFiles.includes(true)) {
                files.forEach(element => {
                    if (fs.existsSync(element.path)) {
                       fs.unlinkSync(element.path) 
                    }
                })

                return res.status(400).json({
                    message: 'PDF is not allowed'
                })
            }
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: 'User trying to create Post, does not exists.'
            })
        }

        for( const file of files) {
            const result = await  cloudinary.uploader.upload(file.path, (error, data) => {
                if (error) {
                    fs.unlinkSync(file.path)
                    return res.status(500).json({
                        message: 'Failed to Upload File' + error.message
                    })
                } else {
                    return data
                }
            })

            const mediaObject = {
                imageUrl: result.secure_url,
                imageId : result.public_id
            }

            media.push(mediaObject)
            fs.unlinkSync(file.path)
        }

        const data = {
            content,
            media,
            userId
        }

        // const newPost = await postModel.create(data)
        const newPost = new postModel(data)

        user.posts.push(newPost._id)

        //Save the Changes to Database
        await newPost.save()
        await user.save()

        res.status(201).json({
            message: 'Post created successfully',
            data: newPost
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOnePost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await userModel.findById(id).populate('userId', 'fullName email')

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        res.status(200).json({
            message: 'Post found',
            data: post
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}