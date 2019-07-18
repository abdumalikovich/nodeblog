// get modules
const express = require('express')

const app = express()
const router = express.Router()

// upload
const multer = require('multer') // upload image
const mkdirp = require('mkdirp') // create folders
const Sharp = require('sharp') // resize images
const path = require('path')

let random = Math.random(36).toString().slice(-5)
let rs = () => Math.random(36).toString().slice(-5) // random string
// upload end

const fConfig = require('../config')
const fModels = require('../models')
const diskStorage = require('../utils/diskStorage')

// dir and name
const storage = diskStorage({
    destination: (req, file, cb) => {
        const dir = '/' + rs() + '/' + rs()
        mkdirp(fConfig.DESTINATION + dir, err => cb(err, fConfig.DESTINATION + dir))
        // cb(null, fConfig.DESTINATION + dir) // doesn't working because should to create folder before uploading in there
    },
    filename: (req, file, cb) => {
        cb(null, random + '_' + file.originalname)
    },
    sharp: (req, file, cb) => {
        const resizer = Sharp()
            .resize(1280, 720)
            cb(null, resizer)
    }
})
// dir and name end

// jpeg or not
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg') {
        cb(null, true)
        console.log('JPEG IMAGE')
    } else if (file.mimetype === 'image/png') {
        cb(null, true)
        console.log('PNG IMAGE')
    } else {
        console.log('NON-SUPPORTED TYPE')
        cb(null, false)
    }
}
// jpeg or not end

// file size
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
// file size end

router.post('/', upload.single('post_image') , async(req, res, next) => {
    try {
        console.log('\n\n\n\nTRY: \n')

        const sessionId = req.session.id
        const sessionLogin = req.session.userLogin
        
        const image_path = req.file.path
        const post_title = req.body.post_title
        const post_body = req.body.post_body
        const post_draft = req.body.post_draft
        const post_author = req.session.userLogin

        if(post_draft) {
            draft_status = true
        } else {
            draft_status = false
        }

        // debug
        console.log('\n\n\n\nDEBUG: \n')
        console.log('FILE LOCATION: ' + image_path)
        console.log('TEXT TITLE: ' + post_title)
        console.log('TEXT BODY: ' + post_body)
        console.log('DRAFT STATUS: ' + draft_status)
        console.log('AUTHOR: ' + post_author)
        console.log('\nDEBUG END: \n\n\n\n')

        // store to db
        fModels.collectionPost.create({
            post_image: image_path,
            post_title: post_title,
            post_body: post_body,
            draft: draft_status,
            post_author: post_author
        })

    } catch (error) {
        console.log(error)
    }

    res.redirect('/')
})

router.post('/edit', upload.single('newImage') , async(req, res, next) => {
    try {
        console.log('\n\n\n\nTRY: \n')

        const sessionId = req.session.id
        const sessionLogin = req.session.userLogin

        // if(newImageStatus) {

        // }
        
        // const image_path = req.file.path
        const post_title = req.body.post_title
        const post_body = req.body.post_body
        const post_id = req.body.post_id
        let isItNewImage = req.body.isItNewImage

        if(isItNewImage) {
            console.log('NEW IMAGE RECERIVED')
        } else if(!isItNewImage) {
            console.log('FUCKED')
        }

        // debug
        console.log('\n\n\n\nDEBUG: \n')
        // console.log('FILE LOCATION: ' + image_path)
        console.log('TEXT TITLE: ' + post_title)
        console.log('TEXT BODY: ' + post_body)
        // console.log('DRAFT STATUS: ' + draft_status)
        console.log('ID: ' + post_id)
        console.log('isItNewImage: ' + req.body.isItNewImage)
        console.log('\nDEBUG END: \n\n\n\n')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
