var express = require('express');
var app = express();

app.set('view engine', 'ejs')


// Initialize server
require("./config/db")

// Initialize models
require("./config/server")

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


app.get('/', function(req, res) {
	res.render('index');
})


// app.listen(4001, function(){
// 	console.log("running 4001")
// })
