// get modules
const express = require('express')
const multer = require('multer')

const router = express.Router()
const details = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './try/images/')
    },
    filename: (req, file, cb) => {
        cb(null, (new Date().toISOString()).substr(0,10) + file.originalname) // sex
    }
})

const listenFormat = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg') {
        console.log('JPEG IMAGE')
        cb(null, true)
    } else {
        console.log('FUCK UR IMAGE AND YOU')
        cb(null, false)
    }
}

const upload = multer({
    storage: details,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: listenFormat
})

const fModels = require('../models')

router.get('/images', (req, res) => {
    const { post_title, post_body } = req.body

    const sessionId = req.session.id
    const sessionLogin = req.session.userLogin

    res.render('try/images', {
        user: {
            sessionId,
            sessionLogin
        }
    })
})

router.post('/images', upload.single('try_image'), async(req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    try {
        // const { post_title, post_body } = req.body
    
        const sessionId = req.session.id
        const sessionLogin = req.session.userLogin
        
        // console.log(req.body)
        // console.log(req.file)
    
        res.render('try/images', {
            user: {
                sessionId,
                sessionLogin
            }
        })

        fModels.collectionTryImages.create({
            name: req.body.name,
            price: req.body.price,
            image: req.file.path
        })
    } catch(error) {
        console.log(error)
    }
})

module.exports = router
