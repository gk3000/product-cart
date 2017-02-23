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
        var err, validation = this.validate(obj);
        var valid = validation[1];
        var validatedObj = validation[0];

        if (valid) {
            validatedObj.id = this.currentID;
            this.db.push(validatedObj); 
            this.currentID++;   
        } else {
            err = validatedObj;
        }

        cb(err, validatedObj);
    }

    validate(obj) {
        var schema = this.schema, type = this.type;
        var newObj = {}, err = {}

        for (var x in schema) {
            if (schema[x].unique){
                for (var ele of this.db) {
                    if (ele[x] === obj[x]) {
                        err[x] = ele[x] + ' already exists.'
                    }
                } 
            }

            if (!obj[x] && schema[x].required === true) {
                err[x] = 'Missing ' + x + ' element.'
            }

            if (schema[x].type !== type(obj[x])) {
                newObj[x] = "Problem with object type of " + x + ". Expected type to be '" + schema[x].type + "', but it's '" + type(obj[x]) + "'"
            }

            if(schema[x].type === type(obj[x])){
                  newObj[x] = obj[x];
                if (schema[x].type === "array") {
                    obj[x].forEach(function(y){
                        if (schema[x].subType !== type(y)) {
                            err[x] = 'Wrong subtype of ' + x + ' element.'
                        }
                    })
                }
            }
        };

        return Object.keys(err).length === 0 ? [newObj, true] : [err, false];
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

    delete(id,obj, cb) {
        var err = null;
        var successMessage= null;
        var type = this.type
            
            if (type(obj) !== 'object') {
                var err = 'Missing obj argument'
                console.log(err)
                cb(err);
            } else {
                for (var i =0; i < this.db.length; i++){
                    if (this.db[i].id == id) {
                        this.db.splice(i,1);
                      break;
                    }
                  
                }
                    
            }

  
             return cb(err,obj)
          
        }
                

    update(id, newObj, cb) {
        var err;
        var successMessage;
        console.log("id: ", typeof id)
        
                for (var i =0; i < this.db.length; i++){
                      console.log("Enterd into the loop "  + typeof this.db[i].id)
                    if (this.db[i].id === parseInt(id)) {
                          console.log("this.db[i]: ", this.db[i])
                        for(let key in newObj)
                        {
                            this.db[i][key] = newObj[key]
                            console.log("UPDATED DATABASE")
                        }
                        return cb(err, newObj)
                    }
              }
       
    }
};


module.exports = Model;