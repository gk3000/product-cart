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

model.type = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

model.setSchema = function(newSchema) {
    this.schema = newSchema;
};

model.validate = function(obj){
    var schema = this.schema;
    var type = this.type;

    var newObj ={}; 
    schemaKeys = Object.keys(schema)
    var err = {}

    for (var x in schema) {

    	if (schema[x].unique){
    		for (var ele of this.db) {
    			if (this.db[ele][x] === obj[x]) {
    				err.duplicate  = "Duplicate name: " + x
    			}
    		} 
    	}

    	console.log(schema[x].type, type(obj[x]))
        if(schema[x].type === type(obj[x])){
        	console.log("passed first if")
        	  newObj[x]=obj[x];
            if  (schema[x].type === "array") {
            	console.log("passed second if")
            	obj[x].forEach(function(y){
            		if (schema[x].subType = type(y)) {
                        newObj[x].push(y);
                    }
            	})
                    	
			}
        
        } else if (!obj[x] && schema[x].required === true) {
        	console.log("passed else if")
        	return "Missing element from object"
        } else {
        	console.log("passed else")
            return "problem with object type"
        }
    };
    console.log("reached end of function")
    return newObj
}

// model.getAll(CB):
//     takes a callback
//     retrieves all objects into an array
//     executes callback with array if successful, with error if not
model.getAll = function(cb) {
    var err = null;
    cb(err, this.db);
};

//  model.getOne(ID, CB):
//     takes a callback and an ID
//     retrieves the object with that ID
//     executes callback with object if successful, with error if not


model.getOne = function(obj, cb) {
    var err = null;
    var objKey = Object.keys(obj);
    var objVal = obj[objKey];
    var foundObj = null;
    
    if (type(id) !== 'object') {
        var err = 'Missing obj argument'
        cb(err);
    } else {
        for (var ele of this.db) {
            if (ele[objKey] === objVal) {
                cb(err, ele);
            }
        }
    }
    // logic that selects the right oject from the db
    // assign it to sentObj;
};
//  model.save(obj, CB):
//     takes a callback and a new object
//     attempts to save object to database
//     executes callback with error or success status

model.save = function(obj, cb) {
    var err;
    var successMessage;
    var validated = this.type(this.validate(obj)) === 'object';

    if (validated) {
	    obj.id = this.currentID;
    	this.db.push(obj); 
    	this.currentID++; 
    	successMessage = 'saved new object'   	
    } else {
    	err = validate(obj);
    }
    cb(err, successMessage);
}

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

module.exports = model;