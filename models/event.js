var mongoose = require('mongoose');
var Schema = mongoose.Schema
var obj = {eventName : "JavaFullstack" , startDate : "12/03/2017"}

var eventSchema = new Schema({
    eventName : { type : String, required : true},// is required, is unique
    startDate :  Date , // is required
    // endDate : Date,
    // time : String,  // is required
    // subjects : String, // is required
    // eventType : String, // is required
    // image : String, // is required
    // eventDetails : String, // is required
    // price : Number  // is required

})


eventSchema.methods.publish = function (name, date, callback){
// if(typeof(obj.eventName) === String || typeof(obj.startDate)=== Date || 
//   typeof(obj.endDate)=== Date || typeof(obj.time)=== Date ||typeof(obj.eventType)=== Date
//   ||typeof(obj.image)=== Date|| typeof(obj.eventDetails)=== Date ||typeof(obj.price)=== Date){
// if (err) {
//             console.log(err); 
   
//     return err;
// } else {
  mongoose.model("events").create()
}


mongoose.model("...").findAll()

eventSchema.methods.current = function(sessionID, callback) {

} 


mongoose.model('events', eventSchema)

// in your controller!!!!
mongoose.model("events").publish("Event name", "Event Date", (error, rec)=>{
  ....
  res.render(....)

})

