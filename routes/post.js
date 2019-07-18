// get modules
const express = require('express')
// const TurndownService = require('turndown')
// const turndownService = new TurndownService()
const url = require('url')
const multer = require('multer')

const router = express.Router()
let random = Math.random(36).toString().substr(-15)
const details = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, random + '_' + file.originalname)
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

router.get('/edit/:post_id', async (req, res, next) => {
    const sessionId = req.session.id
    const sessionLogin = req.session.userLogin
    const find_post_id = req.params.post_id.trim().replace(/ +(?= )/g, '')

    if(!sessionId || !sessionLogin) {
        const err = new Error('Not Authorized')
        err.static = 404
        next(err)
    } else {
        try {
            const post = await fModels.collectionPost.findById(find_post_id)

            if(!find_post_id) {
                const err = new Error('Not Founded Post')
                err.static = 404
                next(err)
            } else {
                res.render('post/create', {
                    post,
                    user: {
                        sessionId,
                        sessionLogin
                    }
                })
            }
        } catch(error) {
            console.log(error)
        }
    }
})

// get for post
router.get('/create', (req, res, next) => {
    const { post_title, post_body } = req.body

    const sessionId = req.session.id
    const sessionLogin = req.session.userLogin

    if(!sessionId || !sessionLogin) {
        const err = new Error('Not Authorized')
        err.static = 404
        next(err)
        console.log('ERROR')
    } else {
        res.render('post/create', {
            user: {
                sessionId,
                sessionLogin
            }
        })
    }
})

// see drafts
router.get('/drafts', async (req, res) => {
    const { post_title, post_body } = req.body

    
    const sessionId = req.session.id
    const sessionLogin = req.session.userLogin
    try {
        // const user 
        // const all_drafts = fModels.collectionPost.find
        console.log(sessionLogin)

        if(!sessionId || !sessionLogin) {
            res.redirect('/')
        } else {
            const posts = await fModels.collectionPost.find({ draft: true })

            res.render('post/drafts', {
                posts,
                user: {
                    sessionId,
                    sessionLogin
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/create', (req, res, next) => {
    // const post_title = req.body.post_title.trim().replace(/ +(?= )/g, '')
    // const post_body = req.body.post_body
    // const is_draft = false

    // const sessionId = req.session.id
    // const sessionLogin = req.session.userLogin
    
    // fModels.collectionPost.create({
    //     post_title,
    //     post_body,
    //     post_image: req.file.path,
    //     post_author: sessionLogin,
    //     draft: is_draft
    // })

    // console.log(req.file)

    // if(!post_title || !post_body) {
	// 	if(!post_title && !post_body) {
	// 		res.json({
	// 			ok: false,
	// 			message: 'Sorry, you forgot to enter title and article',
	// 			fields: ['post_title', 'post_body']
	// 		})
	// 	} else if(!post_title && post_body) {
	// 		res.json({
	// 			ok: false,
	// 			message: 'Sorry, you forgot to enter article',
	// 			fields: ['post_title']
	// 		})
	// 	} else if(!post_body && post_title) {
	// 		res.json({
	// 			ok: false,
	// 			message: 'Sorry, you forgot to enter title',
	// 			fields: ['post_body']
	// 		})
	// 	} else {
	// 		res.json({
	// 			ok: false,
	// 			message: `Fuckin' error with 1 item`,
	// 			fields: ['post_title', 'post_body']
	// 		})
	// 	}
	// } else {
        // res.redirect('/')
    // }
})

router.post('/get_current_image', async(req, res) => {
    try {
        const current_image_path = req.body.current_image
        // const find_image = await fModels.collectionPost.findById(req)
        const update_image = await fModels.collectionPost.findOneAndUpdate(
            { "id": req.body.post_id },
            { "post_image" : "" },
            () => {
                console.log('image removed')
            }
        )
    } catch(error) {
        console.log(error)
    }
})

router.post('/edit', async (req, res) => {
    const post_title = req.body.post_title.trim().replace(/ +(?= )/g, '')
    const post_body = req.body.post_body
    const find_post_id = req.body.post_id

    const sessionId = req.session.id
    const sessionLogin = req.session.userLogin

    try {
        const find_post = await fModels.collectionPost.findById(find_post_id)

        find_post.post_title = post_title
        find_post.post_body = post_body

        find_post.save((err) => {
            if(err) {
                console.error('ERROR!');
            }
        })

        function getFormattedUrl(req) {
            return url.format({
                protocol: req.protocol,
                host: req.get('host')
            });
        }
        
        res.redirect(getFormattedUrl(req))

        console.log(find_post)
    } catch (error) {
        console.log(error)
    }
})

router.post('/delete', async (req, res) => {
    try {
        let hello = req.body.post_id
        let delete_file = await fModels.collectionPost.findByIdAndRemove(hello, () => {
            res.json({
                ok: true,
                message: 'All is okey',
                fields: []
            })
        })
    } catch (error) {
        console.log(error)
    }
})

// delete draft
router.post('/delete_draft', async (req, res, next) => {
    try {
        let id = req.body.id

        fModels.collectionPost.findByIdAndRemove(id, () => {
            console.log('Draft deleted')
            res.json({
                ok: true
            })
        })
    } catch (error) {
        console.log(error)
    }
})

// draft to post
router.post('/draft_to_post', async(req, res, next) => {
    try {
        let draft_id = req.body.id
        let find_draft = await fModels.collectionPost.findById(draft_id)
        
        // find_draft.draft = false
        find_draft.draft = false

        find_draft.save((err) => {
            if(err) {
                console.error('ERROR!');
            } else {
                res.json({
                    ok: true
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// change image
router.post('/change_image', async(req, res, next) => {
    try {
        console.log(req.body.post_id)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
