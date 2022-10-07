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
    }

}, { 
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)