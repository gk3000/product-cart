var Model = require('../Model.js');

var Sessions = new Model({
    eventIDs: {type: 'array', subType: 'number'}, // number?
    userID: {type: 'number'}
})

Sessions.db = [
    {
    events: [{id: 2, qty: 3}, {id: 1, qty: 4}],
    userID: 1,
    username: 'marilena',
    id: 3
    }
]

module.exports = Sessions;