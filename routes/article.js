// get modules
const express = require('express');
const router = express.Router();

const fModels = require('../models')

router.get('/:post', async(req, res, next) => {
    try {
        const sessionId = req.session.id
        const sessionLogin = req.session.userLogin
    
        const url = req.params.post.trim().replace(/ +(?= )/g, '')
    
        if(!url) {
            const err = new Error('Not Found')
            err.static = 404
            next(err)
        } else {
            const post = await fModels.collectionPost.findOne({ url })

            if(post.draft == true && post.post_author !== sessionLogin) {
                const err = new Error('User is fucked')
                err.static = 404
                next(err)
            } else {
                if(!post) {
                    const err = new Error('Not Found')
                    err.static = 404
                    next(err)
                } else {
                    res.render('post/article', {
                        post,
                        user: {
                            sessionId: sessionId,
                            sessionLogin: sessionLogin
                        }
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
