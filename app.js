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

// Sets default values to prevent crashing
app.locals = {
	err: {},
	user: {},
	session: {}
}

// Creates session and cookie when app is started
var Sessions = require('./models/models/Sessions')
var count = 0;

app.use((req, res, next) => {
	var sessionID = req.cookies.sessionID;
	if (count === 0 || !app.locals.session.id) {
		Sessions.getOne({id: sessionID}, (err, session) => {
			count++;
			if (err) {
				Sessions.save({}, (err, session) => {
					if (err) {
						console.log(err);
					} else {
						app.locals.session = session;
						res.cookie('sessionID', session.id, { maxAge: 100000, httpOnly: false })
					}
				})

			} else {
				app.locals.session = session;
			}
 		})
 	}	
	next()
})


// Set up routes
// public, user and admin routes?
var publicRoutes = require('./controllers/routes/public.js');
app.use("/", publicRoutes)

var userRoutes = require('./controllers/routes/user.js');
app.use('/user', userRoutes)

var adminRoutes = require('./controllers/routes/admin.js')
app.use('/admin', adminRoutes)

const port = process.env.PORT || 4001
app.listen(port, function() {
    console.log("---------------listening in port "+port+"--------------");
})