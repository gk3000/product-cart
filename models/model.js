// this object is your mongoose
class Model {
    constructor(newSchema) {
        this.db = []
        this.sessiondb = []
        this.currentID = 3; // bc of hardcoded events
        this.schema = newSchema;
    }

    type(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    save(obj, cb) {
        var err;
        var validation = this.validate(obj);
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

            if (schema[x].type !== type(obj[x]) && obj[x]) {
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
        if (typeof obj === 'string' && obj) {
            obj = {id: obj};
        }
        var err = {}, type = this.type;
        var objKeys = Object.keys(obj);
        var objLength = objKeys.length;

        for (var ele of this.db) {
            var count = 0;
            objKeys.forEach(key => {
                if (ele[key] == obj[key]) {
                 count++
                }
            })

            if (count === objLength) {
                return cb(err = null, ele)
            }
        }

        err = "Object not found."
        cb(err)
    }

    delete(id,obj, cb) {
        var err = null;
        var successMessage= null;
        var type = this.type
            
            if (type(obj) !== 'object') {
                var err = 'Missing obj argument'
                console.log(err)
                return cb(err);
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
        var successMessage, newObj, err;
        //console.log("id: ", typeof id)
        for (var i =0; i < this.db.length; i++){
             // console.log("Enterd into the loop "  + typeof this.db[i].id)
            if (this.db[i].id === parseInt(id)) {
                for(let key in newObj) {
                    this.db[i][key] = newObj[key]
                }
                return cb(err = null, this.db[i]);
            }
        }

        err = {msg: "Update unsuccessful"}
        cb(err);
    }


    search(searchword , cb){
        var err = null;
        var eventSent = undefined;
        var type = this.type
        var event;
        var eventsarray = [];
        
        console.log("in search method",searchword)
        for (var i =0; i < this.db.length; i++){
            console.log("enterd into the first dbloop",this.db)     
            for(let key in this.db[i]) {
                var idno;
                console.log("keys in db",key)
                var word=this.db[i][key]
                 console.log("word is  ", word)
                 
                if(type(word) === 'array'){
                    
                   for(let j of word){
                        console.log(j)
                        console.log(searchword)
                        if(searchword == j ) {
                          console.log("found word in an array of index", this.db[i].id)
                          var idno = this.db[i].id
                           event = this.getOne({id:idno},function(err,event){
                           console.log("From getone method",event)
                            eventsarray.push(event) 
                            console.log("After pushing in array if it is an array",eventsarray)
                          })
                          
                        }  

                   }
                }
                else if(searchword == word) {
        
                    console.log("Found Word as word")
                    var idno = this.db[i].id
                      event = this.getOne({id:idno},function(err,event){
                         eventsarray.push(event) 
                         console.log("After pushing in array if it is a string",eventsarray)      
                      })
                       
                }  
            }     
        }
        if (eventsarray == undefined) {
            err = "Word not found"
        }
        console.log("Before return statement",eventsarray) 
        
         cb(err,eventsarray)
    }
}    


class Sessions extends Model {
    constructor (newSchema) {
        super()
        this.sessiondb = []
    }

    type(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    savesessions(obj, cb) {
       
        var sessionsarray = [];
        if (type(obj) !== 'object') {
                var err = 'Missing obj argument'
                console.log(err)
                return cb(err);
        } else {
                var idno = obj.eventIDs
                console.log(idno)
                this.sessiondb.push(idno)
                console.log(sessiondb)
                // event = this.getOne({id:idno},function(err,event){
                //     console.log("From getone method sessiondb",event)
                //     sessionsarray.push(event) 
                //     console.log("After pushing in array if it is a string",sessionsarray)      
              //  })
                      
                           
        }

        if (this.sessiondb == undefined) {
            err = "session not saved"
        }
        console.log("Before return statement",sessionsarray) 
        
         cb(err,sessiondb)
    }
}
module.exports = Model;
