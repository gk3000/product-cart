// this object is your mongoose
class Model {
    constructor (newSchema) {
        this.db = []
        this.schema = {}
        this.currentID = 3; // bc of hardcoded events
        this.setSchema(newSchema, (err, schema) => {
            if (err) {
                console.log(err);
            } else {
                console.log('SCHEMA SUCCESSFULLY ADDED')
            }
        })
    }

    type(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    setSchema(newSchema, cb) {
        this.schema = newSchema;
        var err;
        cb(err, newSchema);
    }

    save(obj, cb) {
        var err, successMessage;
        // change this
        // validate returns either an object of errors OR the obj
        var validated = this.type(this.validate(obj)) === 'object';

        if (validated) {
            obj.id = this.currentID;
            this.db.push(obj); 
            this.currentID++; 
            successMessage = 'Saved new object'     
        } else {
            err = this.validate(obj);
            console.log('err from save function: ', err)
        }
        cb(err, successMessage);
    }

    validate(obj) {
        var schema = this.schema, type = this.type;
        var newObj ={}, err = {}

        for (var x in schema) {
            if (schema[x].unique){
                
                console.log('Unique property: ', x)
                for (var ele of this.db) {
                    if (ele[x] === obj[x]) {
                        err[x] = ele[x] + ' already exists.'
                    }
                } 
            }

            if(schema[x].type === type(obj[x])){
                  newObj[x]=obj[x];
                if  (schema[x].type === "array") {
                    obj[x].forEach(function(y){
                        if (schema[x].subType = type(y)) {
                            newObj[x].push(y);
                        }
                    })
                }
            console.log('err after all the ifs before else if: ', err)
            return err ? err : newObj;
            
            } else if (!obj[x] && schema[x].required === true) {
                return "Missing element from object"

            } else {
                return "Problem with object type of " + x + ". Expected type to be " + schema[x].type + ", but it's a " + type(obj[x])
            }
        };
        }

        getAll(cb) {
            var err;
            cb(err, this.db);
        }

        getOne(obj, cb) {
            var err, type = this.type;
            var objKey = Object.keys(obj)[0];
            var objVal = obj[objKey];
            
            if (type(obj) !== 'object') {
                var err = 'Missing obj argument'
                console.log(err)
                cb(err);
            } else {
                for (var ele of this.db) {
                    if (ele[objKey] == objVal) {
                        return cb(err, ele);
                    }
                }
            }
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