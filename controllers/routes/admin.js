var express      = require('express'),
    router       = express.Router(),
    app          = express(),
    Sessions     = require('../../models/models/Sessions'),
    Users		 = require('../../models/models/Users'),
    Events		 = require('../../models/models/Events')


router.use((req, res, next) => {
    console.log('SESSION: ', req.app.locals.session)
    if (req.app.locals.session.userID) {
        next();
    } else {
        var err = {msg: 'You must be logged in to view this page.'}
        res.render('error', {err})
    }
    next()
})

router.get('/', (req, res) => {
	res.render('user')
})





module.exports = router;