const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comment = new Schema(
    {
        comment_text: {
            type: String,
            required: true
        },
        comment_post: {
            type: Schema.Types.ObjectId,
            ref: 'collectionPost'
        },
        comment_owner: {
            type: Schema.Types.ObjectId,
            ref: 'collectionUser'    
        },
        comment_createdAt: {
            type: Date,
            default: Date.now
        },
        comment_parent: {
            type: Schema.Types.ObjectId,
            ref: 'collectionComment'    
        },
        comment_children: [
            {
                type: Schema.Types.ObjectId,
                ref: 'collectionComment'
            }
        ]
    }
)

comment.set('toJSON', { virtuals: true })

module.exports = mongoose.model('collectionComment', comment)
