var express      = require('express'),
    router       = express.Router(),
    app          = express(),
    Sessions     = require('../../models/models/Sessions'),
    Users		 = require('../../models/models/Users'),
    Events		 = require('../../models/models/Events')


router.get('/', (req, res) => {
	res.render('user')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', (req, res) => {
	var username = req.body.username,
		password = req.body.password;

	Users.login({username, password}, (err, user) => {
		if (err) {
			res.render('login', {err, user})
		} else {
			Sessions.update(req.app.locals.session.id, {userID: user.id, username: user.username}, (err, session) => {
				if (err) {
					console.log(err)
					var err = {msg: 'Something went wrong. Please try again later.'}
					res.render('login', {err})
				} else {
					req.app.locals.session = session;
					res.render('user')
				}
			})
		}
	})
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', (req, res) => {
	var username = req.body.username,
		password = req.body.password;
	Users.save({username, password}, (err, user) => {
		if (err) {
			user = {username, password}
			res.render('register', {err, user})
		} else {
			Sessions.update(req.app.locals.session.id, {userID: user.id, username: user.username}, (err, session) => {
				if (err) {
					var err = {msg: 'Something went wrong. Please try again later.'}
					res.render('register', {err})
				} else {
					req.app.locals.session = session;
					res.render('user')
				}
			})
		}
	})
})

router.get('/logout', (req, res) => {
	Sessions.update(req.app.locals.session.id, {username: undefined, userID: undefined}, (err, session) => {
		if (err) {
			console.log(err);
		} else {
			req.app.locals.session = session;
			res.redirect('/events')
		}
	})
})

module.exports = router;