var Model = require('../model.js');

var Users = new Model({
    username: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true},
    admin: {type: 'boolean'}
})

Users.db = [
	{id: 1, username: "admin", password: "admin", admin: true},
	{id: 2, username: "user", password: "user", admin: false}
]

// should this be here???
Users.login = (obj, cb) => {
    var err = {};

    for (var ele of Users.db) {
        if (ele.username === obj.username) {
        	if (ele.password === obj.password) {
                console.log('ELE LOGIN: ', ele)
        		return cb(err = null, ele);
        	} else {
        		err.password = "Incorrect password"
        		return cb(err, obj);
        	}
        }
    }

    err.username = "User not found."
    cb(err, obj)
}

// var Users = new Model({
//     firstName: {type: "string"},
//     lastName: {type: "string"},
//     NIF: {type: "string"},
//     companyName: {type: "string"},
//     emailAddress: {type: "string"},
//     phoneNumber: {type: "number"}, // number?
//     country: {type: "string"},
//     address: {type: "string"},
//     postcode: {type: "string"},
//     city: {type: "string"},
//     province: {type: "string"}
// })

module.exports = Users;