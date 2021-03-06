var express = require('express'),
app = express();
const router = express.Router()
const mongoose = require("mongoose")
const Model = require('../models/modelClass')

app.set('view engine', 'ejs');

// Creates new models with schema as argument
var Sessions = new Model({
    events: {type: 'array', subType: 'object'},
    userID: {type: 'number'}
})

Sessions.db = [
    {
    events: [{id: 2, qty: 3}, {id: 1, qty: 4}],
    userID: 01
    }
]

var Events = new Model({
    name: {type: "string", unique: true, required: true},
    startDate: {type: "string", required: true},
    endDate: {type: "string", required: true},
    subjects: {type: "array", subType: "string", required: true},
    type: {type: "array", subType: "string", required: true},
    image: {type: "string", required: true},
    description: {type: "string", required: true},
    price: {type: "number", required: true}
   })

// TEMPORARY DB
Events.db = [
    {
        id: 1,
        name: "SuperCodeCamp",
        startDate: '12/07/2017, 10:00 AM',
        endDate: '27/08/2017, 08:00 PM',
        subjects: ['Node.js', 'express.js', 'mongoDB'],
        type: ['Full stack', 'Three months'],
        image: 'https://i2.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/04/students-in-classroom.jpg?zoom=1.5&fit=564%2C388',
        description: 'This is a code camp',
        price: 3000
    },
    {
        id: 2,
        name: "Workshop",
        startDate: '27/05/2017, 08:00 AM',
        endDate: '28/05/2017, 08:00 PM',
        subjects: ['Node.js', 'express.js', 'mongoDB', 'javascript'],
        type: ['Full stack', 'Two days'],
        image: 'https://i2.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/04/students-in-classroom.jpg?zoom=1.5&fit=564%2C388',
        description: 'This is a workshop',
        price: 300
    }
]

var Users = new Model({
    firstName: {type: "string"},
    lastName: {type: "string"},
    NIF: {type: "string"},
    companyName: {type: "string"},
    emailAddress: {type: "string"},
    phoneNumber: {type: "number"}, // number?
    country: {type: "string"},
    address: {type: "string"},
    postcode: {type: "string"},
    city: {type: "string"},
    province: {type: "string"}
})

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

// SHOW FORM FOR CREATING NEW EVENTS (works)
router.get("/events/new", (req, res) => {
    var err = {};
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

    res.render("new", {newEvent, err})
})

// POST NEW EVENT (works)
router.post('/events/new', (req, res) => {
    var name = req.body.name,
        startDate = req.body.startdate,
        endDate = req.body.enddate,
        subjects = req.body.subjects === '' ? null : req.body.subjects.split(', '),
        type = req.body.type === '' ? null :req.body.type.split(', '),
        image = req.body.image,
        price = parseInt(req.body.price),
        description = req.body.description,

        newEvent = {name, startDate, endDate, subjects, type, image, price, description};
        console.log('subjects after splitting: ', subjects)
    Events.save(newEvent, (err, event) => {
        if (err) {
            newEvent = {name, startDate, endDate, subjects, type, image, price, description}
            console.log(newEvent)
            res.render('new', {newEvent, err})
        } else {
            console.log('SUCCESSFULLY SAVED')
            res.redirect('/events')
        }
    })
})


///////////////// FOR ZLATAN ///////////////////////////////////////////

// SHOW SINGLE EVENT (doesn't work)
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

///////////////// NOT FOR ZLATAN ///////////////////////////////////////////

// ADD EVENT TO CART (doesn't work)
router.post("/cart/:id", function(req, res){
    Sessions.save({eventIDs: [req.params.id]}, (err, record) =>{
        if (err) {
            res.render("error", {err})
        } else {
        res.cookie('sessionID', record._id, { maxAge: 9000000000, httpOnly: false })
        }
    })
})


// SHOW CART (doesn't work)
router.get("/cart", (req, res) => {
    var cartEvents = []
    var rec = Sessions.db[0] // expected output of search for the user session
console.log("-----------rec.events-----------", rec.events) // array with objects {id: , qty: }
        for (var i = 0; i < rec.events.length; i++) {
            console.log(rec.events[i])
            
        }

    // if session (from req.cookies.sessionID) exists 
    // Sessions.getOne(req.cookies.sessionID, (err, records) => {

        // if (err) {
        //     console.log("-------------error checking cookie---------")
        //     res.render("cart")
        //     // res.render("error", {err})
        // } else if (records === null || undefined) {
        //     console.log("-----------records------------", records)
        //     res.render("cart")
        // } else {
            //display cart with event associated to the current user
            res.render("cart", {rec})
        // }
})



// // SHOW CART THE OLD ONE
// router.get("/cart", (req, res) => {
//     // console.log("-----------Events.db---------", Events.db)
//     res.render("Oldcart", {events: Events.db})
    
// })


// POST /cart/update
// Cart page with update the quantity of products
//     renders the cart.ejs
// args: post, sessionID, amount of products

router.post("/cart/update/:id", (req, res) => {
    console.log("--------new quantity--------", req.body.name)
    var qty = req.body.name
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
    total = req.params.total
    res.render("checkout")
})

//
router.get('/events/update/:id', (req, res) => {
    Events.getOne({id: req.params.id}, (err, event) => {
        res.render('update', {event});
    })
})

// UPDATE EVENT
router.post('/events/update/:id', (req, res) => {
    var name = req.body.name,
        startDate = req.body.startdate,
        endDate = req.body.enddate,
        subjects = req.body.subjects.split(', '),
        type = req.body.type.split(', '),
        image = req.body.image,
        price = parseInt(req.body.price),
        description = req.body.description;
        
    var updatedEvent = {name, startDate, endDate, subjects, type, image, price, description};

    Events.update(req.params.id, updatedEvent, (err, event) => {

    })
})

module.exports = router;





/*


POST /cart/remove
Cart page with remove the product option
    renders the cart.ejs
args: post, sessionID, remove event

GET /cart/coupon
Cart page with apply the coupon option to get a discount
    renders the cart.ejs
args: get, coupon, discoun

POST /checkout/pay
args: post, sessionID
– saves users billing details in the database
– check if the terms & conditions are checked
– redirects to/process the payment
– redirects back to the root or displays the confirmation page*/