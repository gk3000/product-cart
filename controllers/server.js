var express = require('express'),
app = express();
const router = express.Router()
const mongoose = require("mongoose")
const Model = require('../models/modelClass')

app.set('view engine', 'ejs')

// calling the model
// var Sessions = require('../models/model')

// calling the dummy model
// var Sessions = require('../models/model')
// Sessions.setSchema(   {
//      eventIDs: [ // array of object IDs
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Event"
//         }
//     ],
//     sessionID: String      
//    },
//    (err, statement) => {
//         if(err) {
//             console.log("Error setting the sessions schema")
//         } else {
//             console.log("Success setting the sessions schema")
//         }
//    }
//    )

// calling the model
// var Events = require('../models/model')
// calling the dummy model
var Events = new Model();

Events.setSchema({
        name: {type: "string"},
        startDate: {type: "string"},
        endDate: {type: "string"},
        subjects: {type: "array", subType: "string"},
        type: {type: "array", subType: "string"},
        image: {type: "string"},
        description: {type: "string"},
        price: {type: "number"}
    },(err, statement) => {
        if(err) {
            console.log("Error setting the events schema")
        } else {
            console.log("Success setting the events schema")
        }
   })

// calling the model
// var Users = require('../models/model')
// calling the dummy model
// var Users = require('../models/model')
// Users.setSchema({
//         // firstName: String,
//         // lastName: String,
//         // NIF: String,
//         // companyName: String,
//         // emailAddress: String,
//         // phoneNumber: Number,
//         // country: String,
//         // address: String,
//         // postcode: String,
//         // city: String,
//         // province: String
//     },(err, statement) => {
//         if(err) {
//             console.log("Error setting the users schema")
//         } else {
//             console.log("Success setting the users schema")
//         }
//    })


// connect to our model with assigned variable to use inside the controller
// const eventsCollection = mongoose.model("events");
// const sessionCollection = mongoose.model("sessions")

router.get('/', function(req, res) {
    res.redirect('/events')
})

/*GET /events   
Displays the events calendar page
    renders the index.ejs view */
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


router.get("/events/new", (req, res) => {
    var name, startDate, endDate, subjects, type, image, price, description;
    var newEvent = {name, startDate, endDate, subjects, type, image, price, description}
    res.render("new", {newEvent})
})

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

/*
GET /events/:id
Displays the  selected single event page
    renders the show.ejs
*/
router.get("/events/:id", function (req, res) {
    Events.getOne(req.params.id, (err, event) => {
        if (err) {
            res.render("error", {err})
        } else {
            res.render("show", {event})
        }
    })
})
/*
POST /cart/:id
- creates new session object
- adds event reference to session object
- creates new cookie with sessionID equal to session._id
- redirects to /cart
*/

router.post("/cart/:id", function(req, res){
    Sessions.save({eventIDs: [req.params.id]}, (err, record) =>{
        if (err) {
            res.render("error", {err})
        } else {
        res.cookie('sessionID', record._id, { maxAge: 9000000000, httpOnly: false })
        }
    })
})


/*    
GET /cart
- displays the events the client has selected
- information about selected tickets and the client is stored in an object ('session')
- renders cart.ejs
*/
router.get("/cart", (req, res) => {
    // if session (from req.cookies.sessionID) exists 
    Sessions.getOne(req.cookies.sessionID, (err, records) => {
        if (err) {
            res.render("error", {err})
        } else {
            //display cart with event associated to the current user
            res.render("cart", records)
        }
    })

})

/*
GET /checkout/
Displays the checkout page for the user with his sessionID
renders the checkout.ejs
args: get, sessionID
*/

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