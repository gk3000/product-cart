// this object is your mongoose
class Model {
    constructor (newSchema) {
        this.db = []
        this.schema = {}
        this.id = 0
        this.id++
        this.setSchema(newSchema, (err, schema) => {
            if (err) {
                console.log(err);
            } else {
                console.log('SCHEMA SUCCESSFULLY ADDED:')
                console.log(schema);
            }
        })
    }

    currentID() {

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
            var objKey = Object.keys(obj);
            var objVal = obj[objKey];
            var foundObj = null;
            var type = this.type;
            
            if (type(obj) !== 'object') {
                var err = 'Missing obj argument'
                cb(err);
            } else {
                for (var ele of this.db) {
                    if (ele[objKey] === objVal) {
                        cb(err, ele);
                    }
                }
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
            cb(err, successMessage);
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