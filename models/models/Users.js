var Model = require('../Model.js');

var Users = new Model({
    firstName: {type: "string"},
    lastName: {type: "string"},
    NIF: {type: "string"},
    companyName: {type: "string"},
    emailAddress: {type: "string"},
    phoneNumber: {type: "number"}, // number?
    country: {type: "string"},
    address: {type: "string"},
    postcode: {type: "string"},
    city: {type: "string"},
    province: {type: "string"}
})

module.exports = Users;