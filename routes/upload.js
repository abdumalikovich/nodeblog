const express = require('express')
const path = require('path')
const multer = require('multer')
// const Sharp = require('sharp')
// const mkdirp = require('mkdirp')
// const diskStorage = require('../utils/diskStorage')
// const now = require('moment')

const router = express.Router()
const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storageFile })

const models = require('../models')
const config = require('../config')

// dates for naming files
var date = Date(Date.now());
date.toString()

const date_month = date.substr(4,3).toLowerCase()
const date_day = date.substr(8,2)
const date_year = date.substr(11,4)
// dates for naming files end

router.post('/image', upload.single('file'), async(req, res, next) => {
    console.log('123312')

    try {
        // const
    } catch (error) {
        console.log(error)
    }
})

module.exports = router

// const rs = () => 
//     Math.random()
//         .toString(36)
//         .slice(-3)

// const storage = diskStorage({
//     destination: (req, file, cb) => {
//         const dir = '/' + rs() + '/' + rs()

//         mkdirp(config.DESTINATION + dir, err => cb(err, config.DESTINATION + dir))

//         // cb(null, mConfig.FILE_FOLDER + folder)
//     },
//     filename: (req, file, cb) => {
//         // const sessionId = req.session.id
//         // const fileName = Date.now().toString(36) + path.extname
//         // (file.originalname)
//         // const f
//         cb(null, Date.now() + path.extname(file.originalname))
//     },
//     sharp: (req, file, cb) => {
//         const resizer = Sharp()
//             .resize(1024, 768)
//             .max()
//             .withoutEnglargement()
//             .jpeg({
//                 quality: 40,
//                 progressive: true
//             })
//         cb(null, resizer);
//     }
// })

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 4 * 1024 * 1024
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//             const err = new Error('Extension')
//             err.code = "EXTENSION"
//             return cb(err)
//         }
//         cb(null, true)
//     }
// }).single('file')
