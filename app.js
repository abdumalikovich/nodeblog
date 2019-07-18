// get modules
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const base64Img = require('base64-img')

const mConfig = require('./config')

const fRoutes = require('./routes')

// database
mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.set('useCreateIndex', true)

mongoose.connection
    .on('error', error => console.log('Error'))
    .on('close', () => { console.log('Close') })
    .on('open', () => { console.log('') })

mongoose.connect(mConfig.MONGOURL, { useNewUrlParser: true })

const app = express()

// session
app.use(session({
    secret: mConfig.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))


// sets & uses
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/static', express.static('static'))
app.use('/uploads', express.static('uploads'))
app.use('/dist', express.static('dist'))
app.use('/favicon.ico', express.static('favicon.ico'))

// routes
app.use('/', fRoutes.fHistory)
app.use('/article/', fRoutes.fArticle)
app.use('/author/', fRoutes.fAuthor)
app.use('/api/auth/', fRoutes.fAuth)
app.use('/post/', fRoutes.fPost)
app.use('/uploads/', fRoutes.fUpload)
app.use('/try/', fRoutes.fTry)
app.use('/create/', fRoutes.fCreate)

// // 404
// app.use((req, res, next) => {
//     const err = new Error('Not Found')
//     err.static = 404
//     next(err)
// })

// // 500
// app.use((error, req, res, next) => {
//     res.status(error.status || 500)
//     res.render('error', {
//         message: error.message,
//         error: !mConfig.IS_PRODUCTION ? error : {}
//     })
// })

// listening
app.listen(mConfig.PORT, () => {
    console.log('LISTEN ' + mConfig.PORT)
})
