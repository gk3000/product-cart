var Events = require("./model")
Events.setSchema({
    name: {type: "string", required: true, unique: true}, // is required, is unique
    startDate : {type: "date", required: true}, // is required
    endDate : {type: "date", required: true}, // is required
    time : {type: "date", required: true},  // is required
    subjects : {type: "array", subType: "string", required: true},  // is required
    eventType : {type: "array", subType: "string", required: true} ,// is required
    image :  {type :"string", required: true},// is required
    details :{type :"string", required: true}, // is required
    price : {type :"number", required: true}  // is required
})

var Sessions = require("./model")
Sessions.setSchema({
	
})

var shoppingModel = require("./model")
shoppingModel.setSchema({shopping schema})


eventsModel.delete(obj, cb)