// get modules
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const fModels = require('../models')


/*
	REGISTER
*/

router.post('/register', (req, res) => {
	const { register_login, register_address, register_password, register_password_confirm } = req.body

	if(!register_login || !register_password) {
		if(!register_login && !register_password) {
			res.json({
				ok: false,
				message: 'Sorry, you forgot to enter your login and password',
				fields: ['register_login', 'register_password']
			})
		} else if(!register_login && register_password) {
			res.json({
				ok: false,
				message: 'Sorry, you forgot to enter your login',
				fields: ['register_login']
			})
		} else if(register_login && !register_password) {
			res.json({
				ok: false,
				message: 'Sorry, you forgot to enter your password',
				fields: ['register_password']
			})
		} else {
			res.json({
				ok: false,
				message: `Fuckin' error with 1 item`,
				fields: ['register_login', 'register_password', 'register_password_confirm']
			})
		}
	}
	 else if(register_login && register_password) {
		if(register_login.length <= 5 && register_password.length <= 5) {
			res.json({
				ok: false,
				message: 'Login and password must have 6 or more characters',
				fields: ['register_login', 'register_password']
			})
		} else if(register_login.length <= 5 && register_password.length > 5 && register_password !== register_password_confirm) {
			res.json({
				ok: false,
				message: `Login must have 6 or more characters, passwords don't match`,
				fields: ['register_login', 'register_password', 'register_password_confirm']
			})
		} else if(register_login.length <= 5 && register_password.length > 5 && register_password === register_password_confirm) {
			res.json({
				ok: false,
				message: 'Login must have 6 or more characters',
				fields: ['register_login']
			})
		} else if(register_login.length > 5 && register_password.length <= 5) {
			res.json({
				ok: false,
				message: `Password must have 6 or more characters`,
				fields: ['register_password']
			})
		} else if(register_login.length > 5 && register_password.length > 5 && register_password !== register_password_confirm) {
			res.json({
				ok: false,
				message: `Passwords don't match`,
				fields: ['register_password', 'register_password_confirm']
			})
		} else if(register_login.length > 5 && register_password.length > 5 && register_password === register_password_confirm) {
			fModels.collectionUser.findOne({
				register_login
			}).then(user => {
				if(!user) {
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(register_password, salt, (err, hash) => {
							fModels.collectionUser.create({
								register_login,
								register_address,
								register_password: hash
							}).then(user => {
								req.session.id = user.id
								req.session.userLogin = user.register_login
								console.log('\nUSER ID: ' + user.id)
								console.log('USER SESSION ID: ' + req.session.id)
								res.json({
									ok: true,
									message: 'All is okey',
									fields: []
								})
							})
						})
					})
					console.log('Registered one')
				} else {
					res.json({
						ok: false,
						message: 'Login is busy',
						fields: ['register_login']
					})
					console.log('Busy one')
				}
			})
		} else {
			res.json({
				ok: false,
				message: `Fuckin' error with 2 item`,
				fields: ['register_login', 'register_password', 'register_password_confirm']
			})
		}
	} else {
		res.json({
			ok: false,
			message: `Fuckin' error mine`,
			fields: ['register_login', 'register_password', 'register_password_confirm']
		})
	}

})

/*
	REGISTER END
*/



/*
	SIGN IN
*/

router.post('/login', (req, res) => {
	const { sign_in_login, sign_in_password } = req.body
	
	if(!sign_in_login || !sign_in_password) {
		if(!sign_in_login && !sign_in_password) {
			res.json({
				ok: false,
				message: 'Sorry, you forgot to enter your login and password',
				fields: ['sign_in_login', 'sign_in_password']
			})
		} else if(!sign_in_login && sign_in_password) {
			res.json({
				ok: false,
				message: 'Sorry, you forgot to enter your login',
				fields: ['sign_in_login']
			})
		} else if(sign_in_login && !sign_in_password) {
			res.json({
				ok: false,
				message: 'Sorry, you forgot to enter your password',
				fields: ['sign_in_password']
			})
		} else {
			res.json({
				ok: false,
				message: `Fuckin' error with 1 item`,
				fields: ['sign_in_login', 'sign_in_password']
			})
		}
	} else if (sign_in_login || sign_in_password) {
		if(sign_in_login.length <= 5 && sign_in_password.length <= 5) {
			res.json({
				ok: false,
				message: `Login must have 6 or more characters, passwords don't match`,
				fields: ['sign_in_login', 'sign_in_password']
			})
		} else if(sign_in_login.length <= 5 && sign_in_password.length > 5) {
			res.json({
				ok: false,
				message: `Login must have 6 or more characters`,
				fields: ['sign_in_password']
			})
		} else if(sign_in_password.length <= 5 && sign_in_login.length > 5) {
			res.json({
				ok: false,
				message: `Password must have 6 or more characters`,
				fields: ['sign_in_login']
			})
		} else {
			fModels.collectionUser.findOne({
				register_login: sign_in_login
			}).then(user => {
				if(!user) {
					res.json({
						ok: false,
						message: `Wrong login or password, please try again`,
						fields: ['sign_in_login', 'sign_in_password']
					})
				} else {
					bcrypt.compare(sign_in_password, user.register_password, function(err, result) {
						if(!result) {
							res.json({
								ok: false,
								message: `Wrong login or password, please try again`,
								fields: ['sign_in_login', 'sign_in_password']
							})
						} else {
							req.session.id = user.id
							req.session.userLogin = user.register_login
							console.log('\nUSER ID: ' + user.id)
							console.log('USER SESSION ID: ' + req.session.id)
							res.json({
								ok: true,
								message: `All is okey`,
								fields: []
							})
						}
					});
				}
			}).catch(err => {
				console.log(err)
				res.json({
					ok: false,
					message: `Fuckin' error`,
					fields: ['sign_in_login', 'sign_in_password']
				})
			})
		}
	}

})

/*
	SIGN IN END
*/



/*
	LOG OUT
*/

router.get('/logout', (req, res) => {
	if(req.session) {
		req.session.destroy(() => {
			res.redirect('/')
			console.log('DESTROYED')
		})
	} else {
		res.redirect('/')
	}
})

/*
	LOG OUT END
*/

module.exports = router
