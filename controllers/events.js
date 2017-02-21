const express  = require('express'),
const router   = express.Router()
const mongoose = require('mongoose')

const eventsCollection = mongoose.model("events");
const sessionCollection = mongoose.model("sessions")


router.get("/events", function(req, res){
	eventsCollection.find({}, (err, records) =>{ 
		if (err) {
			res.redirect("error", err)
		} else {
	    res.render("index", {events: records}) 
	    }}
	)
})

/*
GET /events/:id
Displays the  selected single event page
    renders the show.ejs
*/
router.get("/events/:id", function (req, res) {
	eventsCollection.getOne(req.params.id, (err, record) => {
		if (err) {
			res.redirect("error", err)
		} else {
			res.render("show", {event: record})
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
    sessionCollection.save({eventIDs: [req.params.id]}, (err, record) =>{
        if (err) {
        	res.redirect("error", err)
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
	allSessions.findOne({_id: req.cookies.sessionID}, (err, records) => {
		if (err) {
			res.redirect("error", err)
		} else {
			//display cart with event associated to the current user
			res.render("cart", records)
		}
	})

})





module.exports = router