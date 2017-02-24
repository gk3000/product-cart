var express      = require('express'),
	app          = express();

// Set view engine folder
app.set('view engine', 'ejs')
app.set('view cache', false);

// Body parser for forms
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Access cookies as objects
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Public assets
app.use('/public', express.static('public'))

var authRoutes = require('./controllers/routes/auth.js');
app.use('/user', authRoutes)

// Set up routes
var eventRoutes = require('./controllers/routes/events.js');
app.use("/", eventRoutes)


app.listen(4001, function() {
    console.log("---------------listening in port 4001--------------")
})