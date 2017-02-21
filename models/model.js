//actual schema of events
    schema
        
        {
            eventName:{ type : String,required : true}// is required, is unique
            startDate : Date// is required
            endDate : Date// is required
            time : String  // is required
            subjects : String  // is required
            eventType : String // is required
            image : String // is required
            eventDetails : String // is required
            price : Number  // is required

        }


// this object is your mongoose
var model = {};
// your mongoDB
model.db = [];
// each import of 'model' will support one schema
model.schema = {};
model.currentID = 0;
// ______________________ //
 // todo:  define schema design
// ________________________//
// model.setSchema(schema, CB):
//     takes a callback and an object
//     sets model.schema to schema
//     executes callback with array if successful, with error if not
model.setSchema = function(newSchema, cb) {
    var err;
    var successMessage;
    this.schema = newSchema;
    cb(err, successMessage);
};
// model.getAll(CB):
//     takes a callback
//     retrieves all objects into an array
//     executes callback with array if successful, with error if not
model.getAll = function(cb) {
    var err;
    
    cb(err, this.db);
};
//  model.getOne(ID, CB):
//     takes a callback and an ID
//     retrieves the object with that ID
//     executes callback with object if successful, with error if not
model.getOne = function(id, cb) {
    var err = null;
    
    var sentObj = {};
    // logic that selects the right oject from the db
    // assign it to sentObj 
    cb(err, sentObj);
};
//  model.save(obj, CB):
//     takes a callback and a new object
//     attempts to save object to database
//     executes callback with error or success status

//  model.delete(ID, CB):
//     takes a callback and an ID
//     attempts to delete item from DB
//     executes callback with error or success status
model.delete = function(obj, cb) {
    var err = null;
    var successMessage= null;
    
    // logic to find the matching item and delete it

    cb(err, successMessage);
};
//  model.update(ID, newObj, cb):
//     takes a callback and an id and a new property  
//     attempts to update existing object
//     executes callback with error or success status
model.update = function(id, newObj, cb) {
    var err;
    var successMessage;
    
    newObj.id = id;
    // find old item from this.db by id
    // delete that item
    this.db.push(newObj); 
    cb(err, successMessage);
};
module.export = model;