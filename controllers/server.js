var express = require('express'),
app = express();
const router = express.Router()
const mongoose = require("mongoose")
const Model = require('../models/modelClass')

app.set('view engine', 'ejs');

// Creates new models with schema as argument
var Sessions = new Model({
    eventIDs: {type: 'array', subType: 'number'}, // number?
    userID: {type: 'number'}
})

var Events = new Model({
    name: {type: "string"},
    startDate: {type: "string"},
    endDate: {type: "string"},
    subjects: {type: "array", subType: "string"},
    type: {type: "array", subType: "string"},
    image: {type: "string"},
    description: {type: "string"},
    price: {type: "number"}
   })

Events.db = [
    {
        id: 1,
        name: "SuperCodeCamp",
        startDate: '27/05/2017, 08:00 AM',
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

console.log('Events after hardcoding: ', Events)

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
            console.log(events)
            res.render("index", {events}) 
        }
    }) 
})

// SHOW FORM FOR CREATING NEW EVENTS (works)
router.get("/events/new", (req, res) => {
    var name, startDate, endDate, subjects, type, image, price, description;
    var newEvent = {name, startDate, endDate, subjects, type, image, price, description}
    res.render("new", {newEvent})
})

// POST NEW EVENT (works)
router.post('/events/new', (req, res) => {
    console.log('EVENTS OBJECT: ', Events)
    var name = req.body.name,
        startDate = req.body.startdate,
        endDate = req.body.enddate,
        subjects = req.body.subjects.split(', '),
        type = req.body.type.split(', '),
        image = req.body.image,
        price = parseInt(req.body.price),
        description = req.body.description,
        
        newEvent = {name, startDate, endDate, subjects, type, image, price, description};

    Events.save(newEvent, (err, event) => {
        if (err) {
            console.log(err)
            newEvent = {name, startDate, endDate, subjects: subjects.join(', '), type: type.join(', '), image, price, description}
            res.render('new', {newEvent})
        } else {
            console.log('SUCCESSFULLY SAVED')
            res.render('new', {newEvent})
        }
    })
})

// SHOW SINGLE EVENT (doesn't work)
router.get("/events/:id", function (req, res) {
    Events.getOne(req.params.id, (err, event) => {
        if (err) {
            res.render("error", {err})
        } else {
            res.render("show", {event})
        }
    })
})

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
    // if session (from req.cookies.sessionID) exists 
    Sessions.getOne(req.cookies.sessionID, (err, records) => {
        if (err) {
            console.log("-------------error checking cookie---------")
            // res.render("error", {err})
        } else if (records === null || undefined) {
            console.log("-----------records------------", records)
            // res.render("cart")
        }else {
            //display cart with event associated to the current user
            res.render("cart")
        }
    })

})

module.exports = router;





/*
POST /cart/update
Cart page with update the quantity of products
    renders the cart.ejs
args: post, sessionID, amount of products

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