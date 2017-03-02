var express      = require('express'),
    router       = express.Router(),
    app          = express(),
    Events		 = require('../../models/models/Events'),
    Sessions     = require('../../models/models/Sessions'),
    Users		 = require('../../models/models/Users');
    
/////////// EVENT ROUTES ///////////

// INDEX PAGE
router.get('/', function(req, res) {
    res.redirect('/events')
})    

// SHOW ALL EVENTS
router.get("/events", function(req, res) {
    Events.getAll( (err, events) =>{ 
        if (err) {
            res.render("error", {err})
        } else {
            res.render("index", {events}) 
        }
    }) 
})

// SHOW SINGLE EVENT
router.get("/events/:id", function (req, res) {
    var id = req.params.id;
    Events.getOne({id: id}, function(err, event) {
        if (err) {
            console.log(err);
            res.redirect('/events')
        } else {
            res.render('show', {event})
        }
    })
})

//SEARCH EVENTS
router.get('/events/search', function(req, res) {
   var searchword = req.query.search   
            Events.search(searchword, function(err, events){
                console.log(searchword)
                    if (err) {
                       console.log(err)
                    } else {

                        res.render("index", {events}) 
                        
                    }
            })
   
})

/////////// CART ROUTES ///////////

// SHOW CART 
router.get("/cart", (req, res) => {
    // if session (from req.cookies.sessionID) exists 
    Sessions.getOne(req.cookies.sessionID, (err, session) => {

        if (err) {
                console.log("err from getOne ",err);
                
        } else {
           
            Events.delete(req.params.id, event, (err, event) => {
                if (err) {
                    console.log(err);
                    
                } else {
                    res.redirect('/events')
            
                }
            })
        }

    })
})

router.get("/events/cart/:id", function(req, res){
    Events.getOne({id: req.params.id}, (err, event) => {
        res.render('cart2', {event});
    })
})        

router.post("/events/cart/:id", function(req, res){
    Sessions.savesessions({eventIDs: req.params.id}, (err, session) =>{
        if (err) {
            res.render("error", {err})
        } else {
            res.cookie('sessionID', session.eventIDs, { maxAge: 9000000000, httpOnly: false })
        }
    })
})


router.get("/events/cart/:id", function(req, res){
    Events.getOne({id: req.params.id}, (err, event) => {
       res.render('newcart', {event})

    })
})

router.get('/cart/update/:id', function (req, res) {
    // If it's not showing up, just use req.body to see what is actually being passed.
    console.log(req.body.changeQuantity);
});


router.get("/checkout/:total", (req, res) => {
    total = req.params.total;
    res.render("checkout");
})
/////////// AUTH ROUTES ///////////

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
			Sessions.update(req.app.locals.session.id, {user}, (err, session) => {
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
			Sessions.update(req.app.locals.session.id, {user}, (err, session) => {
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

module.exports = router;