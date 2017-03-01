
class Sessionsdata extends Model{
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
        console.log("Before return statement",this.sessiondb) 
        
         cb(err,this.sessiondb)
    }

}



module.exports = Sessionsdata