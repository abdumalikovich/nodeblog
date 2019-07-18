const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comment = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
)

comment.set('toJSON', { virtuals: true })

module.exports = mongoose.model('collectionTryImages', comment)
