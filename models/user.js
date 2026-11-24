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
        default: 'Active',
        enum: ['Active', 'Suspended', 'Deleted']
    },
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Posts'
    }]
}, {
    timestamps: true
})

const userModel = mongoose.model('Users', userSchema)

module.exports = userModel