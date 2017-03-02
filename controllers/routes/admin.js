var express      = require('express'),
    router       = express.Router(),
    app          = express(),
    Sessions     = require('../../models/models/Sessions'),
    Users		 = require('../../models/models/Users'),
    Events		 = require('../../models/models/Events');

// checks if user is admin
router.use((req, res, next) => {
    var err = {msg: 'You must be logged in as admin to view this page.'}
    console.log(req.app.locals)
    if (req.app.locals.session.user) {
        if (req.app.locals.session.user.admin) {
            next();
        } else {
            res.render('error', {err})
        }
    } else {
        res.render('error', {err})
    }
    next()
})

// DASHBOARD
router.get('/', (req, res) => {
    Events.getAll((err, events) => {
        if (err) {
            res.render('error', {err})
        } else {
            res.render('admin', {events})
        }
    })
})

// GET NEW EVENT FORM
router.get("/events/new", (req, res) => {
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

// POST NEW EVENT
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
            res.redirect('/events')
        }
    })
})

// GET DELETE EVENT PAGE
router.get('/events/delete/:id', (req, res) => {
    Events.getOne({id: req.params.id}, (err, event) => {
        if (err) {
            console.log("err from getOne ", err);      
        } else {
            res.render('delete', {event});
            console.log(event)
        } 
            res.render("error", {err})
    })
})

// DELETE EVENT
router.post('/events/delete/:id', (req, res) => {
    Events.getOne({id: req.params.id}, (err, event) => {
        Events.delete(req.params.id,event, (err,record) =>{
             if (err) {
                console.log("err from Delete ",err);      
            } else {
                res.redirect('/events')
            }    

        })
    })
})

// GET UPDATE EVENT PAGE
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
        subjects = req.body.subjects.split(', '),
        type = req.body.type.split(', '),
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

module.exports = router;