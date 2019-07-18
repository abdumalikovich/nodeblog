const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')
const tr = require('transliter')

const post = new mongoose.Schema(
    {
        post_title: {
            type: String,
            default: '',
            trim: true,
            required: true
        },
        post_body: {
            type: String,
            default: '',
            trim: true,
            required: true
        },
        post_author: {
            type: String,
            ref: 'user'
        },
        draft: {
            type: Boolean,
            required: true
        },
        post_image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

post.plugin(URLSlugs('post_title', {
    field: 'url',
    update: true,
    generator: text => tr.slugify(text)
}))
post.set('toJSON', { virtuals: true })

module.exports = mongoose.model('collectionPost', post)
