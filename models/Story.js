const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({

    name: {
        type: String,

    },
    title: {
        type: String,
        required: true,
       
    },
    status: {
        type: String,
    },
    text: {
        type: String,
        trim: true
    },

}, {
    timestamps: true
})
module.exports = mongoose.model('mystory', StorySchema)