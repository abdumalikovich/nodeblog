// get modules
const express = require('express');
const router = express.Router();

const fModels = require('../models')

async function showArticlesList(req, res) {
    const sessionId = req.session.id
    const sessionLogin = req.session.userLogin

    const numOfPage = 6
    const page = req.params.page || 1

    try {
        const post = await fModels.collectionPost.find({ draft: false })
            .skip(numOfPage * page - numOfPage)
            .limit(numOfPage)
            .sort({ createdAt: -1 })

        const count = await fModels.collectionPost.countDocuments()
        
        res.render('home', {
            post,
            current: page,
            pages: Math.ceil(count / numOfPage),
            user: {
                sessionId: sessionId,
                sessionLogin: sessionLogin
            }
        })
    } catch(error) {
        console.log(error)
    }
}

// get for post
router.get('/', showArticlesList)
router.get('/history/:page', showArticlesList)

module.exports = router
