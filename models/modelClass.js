// this object is your mongoose
class Model {
    constructor () {
        this.db = []
        this.schema = {}
        this.currentID = 0
    }

    type(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    setSchema(newSchema, cb) {
        this.schema = newSchema;
        console.log('This after setSchema', this)
        var err;
        cb(err, newSchema);
    }

    validate(obj) {
        //console.log(obj)
        var schema = this.schema;
        var type = this.type;
        //console.log('THIS:  ', this)
        var newObj ={}; 
        var err = {}

        for (var x in schema) {
            if (schema[x].unique){
                for (var ele of this.db) {
                    if (ele[x] === obj[x]) {
                        err.duplicate = "Duplicate name: " + x
                    }
                } 
            }

            console.log(schema[x].type, obj[x])
            if(schema[x].type === type(obj[x])){
                  newObj[x]=obj[x];
                if  (schema[x].type === "array") {
                    obj[x].forEach(function(y){
                        if (schema[x].subType = type(y)) {
                            newObj[x].push(y);
                        }
                    })
                }
            
            } else if (!obj[x] && schema[x].required === true) {
                return "Missing element from object"

            } else {
                return "Problem with object type of " + x + ". Expected type to be " + schema[x].type + ", but it's a " + type(obj[x])
            }
        };
        //console.log("reached end of function")
        return newObj;
        }

        getAll(cb) {
            var err = null;
            cb(err, this.db);
        }

        getOne(obj, cb) {
            var err = null;
            var foundObj = null;
            var type = this.type;
            
            if (type(obj) !== 'object') {
                var err = 'Missing obj argument'
                cb(err);
            } else {
                 this.db.forEach(function(ele){
                    if (ele.currentID === obj.currentID) {
                      return ele
                    }
                })
                                }
        }

        save(obj, cb) {
            var err;
            var successMessage;
            var validated = this.type(this.validate(obj)) === 'object';

            if (validated) {
                obj.id = this.currentID;
                this.db.push(obj); 
                this.currentID++; 
                successMessage = 'saved new object'     
            } else {
                err = this.validate(obj);
            }
            cb(err, successMessage);
        }

        delete(obj, cb) {
            var err = null;
            var successMessage= null;
                
                if (type(obj) !== 'object') {
                    var err = 'Missing obj argument'
                } else {
                    for (var i =0; i < this.db.length; i++)
                    if (this.bd[i].currentID === obj.currentID) {
                        this.db.splice(i,1);
                      break;
                    }
                       var successMessage = "Deleted successfully"
                }

                    
                    
                        // if they aren't tne same size they aren't the same thing
                        // if they are the same size and do n't have the same properties, they arent' the same
                        // if they are the same, delete
                
                 cb(err,successMessage)
                // logic that selects the right oject from the db
                // assign it to sentObj;
            }
                    

        update(id, newObj, cb) {
            var err;
            var successMessage;
            
            newObj.id = id;
            this.db.push(newObj); 
            cb(err, successMessage);
        }
};

module.exports = Model;