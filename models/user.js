const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    status: {
        type: String,
        default: 'Inactive',
        enum: ['Active', 'Suspended', 'Deleted', 'Inactive']
    },
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Posts'
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    otp:{
        type: String
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('Users', userSchema)

module.exports = userModel