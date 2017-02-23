var Model = require('../Model.js');

var Sessions = new Model({
    eventIDs: {type: 'array', subType: 'number'}, // number?
    userID: {type: 'number'}
})

module.exports = Sessions;