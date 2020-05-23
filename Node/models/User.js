const mongoose = require('mongoose')

const userSchema = {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    status: {
        type: String
    },
    avatar: {
        type: String
    }
}

module.exports = mongoose.model('User', userSchema)