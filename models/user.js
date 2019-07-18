const mongoose = require('mongoose')

const user = new mongoose.Schema(
    {
        register_login: {
            type: String,
            required: true,
            unique: true
        },
        register_address: {
            type: String
        },
        register_password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

user.set('toJSON', { virtuals: true })

module.exports = mongoose.model('collectionUser', user)
