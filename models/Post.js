const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    artist: {
        type: String
    },
    rating: {
        type: Number
    },
    blurb: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { 
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)