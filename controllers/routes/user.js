var express      = require('express'),
    router       = express.Router(),
    app          = express(),
    Sessions     = require('../../models/models/Sessions'),
    Users		 = require('../../models/models/Users'),
    Events		 = require('../../models/models/Events');

// checks if a user is logged in
router.use((req, res, next) => {
    console.log('SESSION: ', req.app.locals.session)
    if (req.app.locals.session.user) {
        next();
    } else {
        var err = {msg: 'You must be logged in to view this page.'}
        res.render('error', {err})
    }
})

// USER PAGE
router.get('/', (req, res) => {
	res.render('user')
})

// LOGOUT
router.get('/logout', (req, res) => {
	Sessions.update(req.app.locals.session.id, {user: null}, (err, session) => {
		if (err) {
			console.log(err);
		} else {
			req.app.locals.session = session;
			res.redirect('/events')
		}
	})
})

module.exports = router;