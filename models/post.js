const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: [{
        imageUrl: {
            type: String
        },
       imageId: {
            type: String
       }
    }]
}, {
    timestamps: true
})

const postModel = mongoose.model('Posts', postSchema)

module.exports = postModel