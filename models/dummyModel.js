 var model = {}

model.demo = {}

 model.setSchema = function(schema, CB){
    this.demo = schema
    CB(null, "successfully set schema")
 }
    // takes a schema and a callback
    // sets this database's schema to schema
    // executes callback with failure or success message
 
 model.getAll = function(CB) {
    CB(null, [this.demo])
 }
    // takes a callback
    // retrieves all objects into an array
    // executes callback with array if successful, with error if not

 model.getOne = function(ID, CB) {
    CB(null, this.demo)
 }
    // takes a callback and an ID
    // retrieves the object with that ID
    // executes callback with object if successful, with error if not

 model.save = function(obj, CB) {
    CB(null, "successfully saved")
 }
    // takes a callback and a new object
    // attempts to save object to database
    // executes callback with error or success status

 model.delete = function(ID, CB){
    CB(null, "successfully deleted")
 }
    // takes a callback and an ID
    // attempts to delete item from DB
    // executes callback with error or success status

 model.update = function(ID, newObj, cb){
    CB(null, "successfully updated")
 }
    // takes a callback and an id and a new property  
    // attempts to update existing object
    // executes callback with error or success status

    module.exports = model