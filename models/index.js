const fPost = require('./post')
const fUser = require('./user')
const fComment = require('./comment')
const fTryImages = require('./try_image')

module.exports = {
    collectionPost: fPost,
    collectionUser: fUser,
    collectionComment: fComment,
    collectionTryImages : fTryImages
}
