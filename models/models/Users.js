var Model = require('../Model.js');

var Users = new Model({
    username: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true}
})

Users.db = [
	{id: 1, username: "marilena", password: "frank"}
]

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