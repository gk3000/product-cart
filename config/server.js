var express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
var app = express()

// Set view engine folder
app.set('view engine', 'ejs')
app.set('view cache', false);

// Body parser for forms
var bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Access cookies as objects
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const router = express.Router()

// public assets
app.use('/public', express.static('public'))

// initialize Controllers
var eventsController = require("../controllers/server")
app.use("/", eventsController)


app.listen(4001, function() {
    console.log("---------------listening in port 4001--------------")
})