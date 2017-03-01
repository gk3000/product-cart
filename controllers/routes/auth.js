var express      = require('express'),
    router       = express.Router(),
    Events       = require('../../models/models/Events'),
    Sessions     = require('../../models/models/Sessions'),
    Users		 = require('../../models/models/Users');


router.get('/', (req, res) => {
	res.render('user')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', (req, res) => {
	var username = req.body.username,
		password = req.body.password;

	Users.getOne({username}, (err, user) => {
		if (err) {
			console.log(err)
			res.render('login', {err})
		} else {
			var userID = user.id;
			Sessions.save({userID}, (err, session) => {
				if (err) {
					var err = {msg: 'Something went wrong. Please try again later.'}
					res.render('register', {err})
				} else {
					console.log(session)
					res.render('user', {user, session})
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
			var userID = user.id;
			Sessions.save({userID}, (err, session) => {
				if (err) {
					var err = {msg: 'Something went wrong. Please try again later.'}
					res.render('register', {err})
				} else {
					res.render('user', {user, session})
				}
			})
		}
	})

})

module.exports = router;