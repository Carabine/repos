const mongoose = require('mongoose')

const postSchema = {
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    postBody: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('Post', postSchema)