var express = require('express'),
    app = express();
const router = express.Router()

app.set('view engine', 'ejs')

var sessionsDB = require('model')
sessionsDB.setSchema({describe schema})

var eventsDB = require('model')
eventsDB.setSchema({})

var usersDB = require('model')
usersDB.setSchema({describe schema})

usersDB.save({new user}, (err) => {});


// connect to our model with assigned variable to use inside the controller
// const eventsCollection = mongoose.model("events");
// const sessionCollection = mongoose.model("sessions")


// DUMMY EVENTS
var events = [
    {
        _id: 1, // will be generated by mongoose
        eventName: 'Code workshop',
        startDate: '20/02/2017',
        endDate: '21/02/2017',
        subjects: ['Node.js', 'express.js'],
        eventType: ['evening', 'one day'],
        image: 'https://i2.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/04/students-in-classroom.jpg?zoom=1.5&fit=564%2C388',
        eventDetails: 'Details',
        price: 400
    },
    {
        _id: 2, // will be generated by mongoose
        eventName: 'JavaScript Full-Stack Bootcamp',
        eventDetails: '8 weeks, Monday to Friday, from 9:00 till you drop',
        startDate: '22/05/2017',
        endDate: '14/07/17',
        subjects: ['Node.js', 'express.js', 'mongoDB'],
        eventType: ['Three month course'],
        image: 'https://i2.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/04/students-in-classroom.jpg?zoom=1.5&fit=564%2C388',
        price: 3000
    }
]

/*GET /events   
Displays the events calendar page
    renders the index.ejs view */
app.get('/', function(req, res) {
    res.render('index', {events})
})

router.get("/events", function(req, res){
    eventsCollection.getAll( (err, records) =>{ 
    	if (err) {
    		res.redirect("error")
    	} else {
        res.render("index", {allEvents: records}) 
	    }} )
     
})

/*
GET /events/:id
Displays the  selected single event page
    renders the show.ejs
*/
router.get ("/events/:id", function (req, res) {
	eventsCollection.findOne({_id: req.params.id }, (err, record) => {
		if (err) {
			res.redirect("error")
		} else {
			res.render("show", {event: record})
		}
	})
})

app.listen(4001, function() {
    console.log('Listening on port 4001!')
})


// POST /cart
// adds product to cart
// creates session ID
// sends a cookie to the users browser
router.post("/cart/:id", function(req, res){
    sessionCollection.save({eventIDs: [req.params.id]}, (err, record) =>{
        if (err) {
        	res.redirect("error")
        } else {
        res.cookie('sessionID', record._id, { maxAge: 9000000000, httpOnly: false })
        }
    }) 
})


/*
GET /cart
checks cookie first
Displays the cart page with selected events
    renders the cart.ejs
args: get, sessionID
User can proceed to the checkout page 
*/
<<<<<<< HEAD
router.get("/cart", (req, res, next) => {
	// if session (from req.cookies.sessionID) exists 
	allSessions.findOne({ _id: req.cookies.sessionID}, (err, rec) => {
		console.log("------------------------------", rec)
		if (err) {
			res.redirect("error")
		} else {
			//display cart with event associated to the current user
			}
			next()
		})
	
	})



=======
>>>>>>> 19e1b893c563784287e127c1c35573c8808f300d


module.exports = router


/*
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