var Events = require("../models/model")
Events.setSchema({
	name: {type: "string", required: true, unique: true},
	startDate : {type: "date", required: true}, 
	endDate : {type: "date", required: true}, 
	time : {type: "date", required: true},  
	subjects : {type: "array", subType: "string", required: true},  
	eventType : {type: "array", subType: "string", required: true} ,
	image :  {type :"string", required: true},
	details :{type :"string", required: true}, 
	price : {type :"number", required: true}  
})

var Sessions = require("../models/model")
Sessions.setSchema({})

var Shopping = require("../models/model")
Shopping.setSchema({})

