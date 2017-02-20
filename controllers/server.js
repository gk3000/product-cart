var express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

// connect to our model with assigned variable to use inside the controller
const eventsCollection = mongoose.model("events")

/*GET /events   
Displays the events calendar page
    renders the index.ejs view */

app.get('/' function(req, res){
    res.redirect('/events')
})

router.get("/events", function(req, res){
    eventsCollection.find({}, (err, records) =>{ 
    	if (err) {
    		res.send ("There was an error fetching events from the database")
    	} else {
        res.render("index", {output: records}) 
	    }
    })
     
})

/*
GET /events/:id
Displays the  selected single event page
    renders the show.ejs
*/
router.get ("/events/:id", function (req, res) {
	eventsCollection.findOne({_id: req.params.id })
})


/*
GET /cart/
Displays the cart page with selected events
    renders the cart.ejs
args: get, sessionID
User can proceed to the checkout page 


GET /checkout/
Displays the checkout page for the user with his sessionID
    renders the checkout.ejs
args: get, sessionID

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
arge: post, sessionID
– saves users billing details in the database
– check if the terms & conditions are checked
– redirects to/process the payment
– redirects back to the root or displays the confirmation page*/