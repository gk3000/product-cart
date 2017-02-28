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

// Sets default values to prevent crashing
app.locals = {
	err: {},
	user: {}
}

// Creates session and cookie when app is started
var Sessions = require('./models/models/Sessions')

app.use((req, res, next) => {
	console.log('req.cookies: ', req.cookies)
	if (!app.locals.session) {
		Sessions.save({}, (err, session) => {
			if (err) {
				console.log(err);
			} else {
				app.locals.session = session;
				console.log(session)
				res.cookie('sessionID', session.id, { maxAge: 100000, httpOnly: false })
				console.log('NEW COOKIE WAS CREATED')
			}
		})
	} else if (app.locals.session && !req.cookies.sessionID){
		console.log('INSIDE ELSE IF!!!')
		Sessions.save({}, (err, session) => {
			if (err) {
				console.log(err);
				err = {msg: 'Something went wrong.'}
				res.render('login', {err})
			} else {
				err = {msg: "Your session has expired. Please log in again."}
				app.locals.session = session;
				res.cookie('sessionID', session.id, { maxAge: 100000, httpOnly: false });
				res.render('login', {err})
			}
		})
	} else {
		console.log('OLD COOKIE: ', req.cookies)
	}
	next()
})

// Set up routes
var eventRoutes = require('./controllers/routes/events.js');
app.use("/", eventRoutes)


app.listen(4001, function() {
    console.log("---------------listening in port 4001--------------");
})