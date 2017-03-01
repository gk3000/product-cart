var express      = require('express'),
    router       = express.Router(),
    Events       = require('../../models/models/Events'),
    Sessions     = require('../../models/models/Sessions'),
    Users        = require('../../models/models/Users')


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// can create admin route and add this to route.use
var isLoggedIn = (req, res, next) => {
    console.log('SESSION: ', req.app.locals.session)
    if (req.app.locals.session.userID) {
        next();
    } else {
        var err = {msg: 'You must be logged in to view this page.'}
        res.render('error', {err})
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INDEX PAGE
router.get('/', function(req, res) {
    res.redirect('/events')
})    

// SHOW ALL EVENTS (works)
router.get("/events", function(req, res) {
    Events.getAll( (err, events) =>{ 
        if (err) {
            res.render("error", {err})
        } else {
            res.render("index", {events}) 
        }
    }) 
})

//Search event in the website
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


// SHOW FORM FOR CREATING NEW EVENTS
router.get("/events/new", isLoggedIn, (req, res) => {
    // newEvent is for testing purposes
    var newEvent = {
            name: 'Code event',
            startDate: '01/01/17',
            endDate: '01/02/17',
            subjects: 'Node.js, javascript',
            type: 'One month',
            image: 'https://i2.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/04/students-in-classroom.jpg?zoom=1.5&fit=564%2C388',
            price: 100,
            description: 'Description'
        }

    res.render("new", {newEvent})
})

// POST NEW EVENT (works)
router.post('/events/new', (req, res) => {
    var name = req.body.name,
        startDate = req.body.startdate,
        endDate = req.body.enddate,
        subjects = req.body.subjects === '' ? null : req.body.subjects.split(', '),
        type = req.body.type === '' ? null : req.body.type.split(', '),
        image = req.body.image,
        price = parseInt(req.body.price),
        description = req.body.description,

        newEvent = {name, startDate, endDate, subjects, type, image, price, description};
    Events.save(newEvent, (err, event) => {
        if (err) {
            newEvent = {name, startDate, endDate, subjects, type, image, price, description}
            res.render('new', {newEvent, err})
        } else {
            console.log('err: ', err, 'event: ', event)
            res.redirect('/events')
        }
    })
})

// SHOW SINGLE EVENT (works)
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


// DELETE EVENT
router.get('/events/delete/:id', (req, res) => {
    Events.getOne({id: req.params.id}, (err, event) => {
        if (err) {
                console.log("err from getOne ",err);      
        } else {
            res.render('delete', {event});
            console.log(event)
        } 
            res.render("error", {err})
    })
})


// router.post('/events/delete/:id', (req, res) => {
//     Events.getOne({id: req.params.id}, (err, event) => {


// SHOW CART (doesn't work OR DOES IT???)
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

            //display cart with event associated to the current user
            res.render("cart", {session})

        }

    })
})



// UPDATE EVENT
//
router.get('/events/update/:id', (req, res) => {
    Events.getOne(req.params.id, (err, event) => {
        if (err) {
            console.log(err);
        } else {
            console.log(event)
            res.render('update', {event});
        }
    })
})

// UPDATE EVENT
router.post('/events/update/:id', (req, res) => {
    var name = req.body.name,
        startDate = req.body.startdate,
        endDate = req.body.enddate,
        subjects = req.body.subjects.split(' , '),
        type = req.body.type.split(' , '),
        image = req.body.image,
        price = parseInt(req.body.price),
        description = req.body.description;
        
    var updatedEvent = {name, startDate, endDate, subjects, type, image, price, description};

    Events.update(req.params.id, updatedEvent, (err, event) => {
        if (err) {
            console.log(err);
            res.redirect('/events/update/' + req.params.id)
        } else {
            res.redirect('/events')
        }
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



// SHOW CART (doesn't work OR DOES IT???)
router.get("/events/cart", (req, res) => {
    // if session (from req.cookies.sessionID) exists 
    Sessions.getOne(req.cookies.sessionID, (err, records) => {
        if (err) {
            res.render("error", {err})
        } else {
            //display cart with event associated to the current user
            res.render("cart", {records})
        }
    })
})

router.post("/cart/update/:id", (req, res) => {
    console.log("--------new quantity--------", req.body.name)
    var qty = req.body.name;

    Sessions.update(req.params.id, {qty: req.body.name}, (err, record) =>{
        if (err) {
            res.render("error", {err})
        } else {
            res.render("cart", {events: Events.db})
        }
    })
})


// CHECKOUT page
router.get("/checkout/:total", (req, res) => {
    total = req.params.total;
    res.render("checkout");
})

module.exports = router;