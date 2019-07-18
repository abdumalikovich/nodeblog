// get modules
const express = require('express');
const router = express.Router();

const fModels = require('../models')

// router.get

router.get('/:author/:history*?', (req, res, next) => {
    const sessionId = req.session.id
    const sessionLogin = req.session.userLogin

    const numOfPage = 3
    
    const page = req.params.history || 1
    const author = req.params.author

    fModels.collectionUser.findOne({
        register_login: author
    }).then(user => {
        fModels.collectionPost.find({
            post_author: author
        })
            .skip(numOfPage * page - numOfPage)
            .limit(numOfPage)
            .sort({ createdAt: -1 })
            .then(post => {
                fModels.collectionPost.countDocuments({
                    post_author: author
                })
                .then(count => {
                    const pages = Math.ceil(count / numOfPage)
                    res.render('user', {
                        author,
                        post,
                        current: page,
                        pages,
                        authorName: user.register_login,
                        user: {
                            sessionId: sessionId,
                            sessionLogin: sessionLogin
                        }
                    })
                    console.log('\n\n\n\n\n' + author)
                    console.log(page)
                    console.log(pages + '\n\n\n\n\n')
                })
            })
    })
})

module.exports = router
