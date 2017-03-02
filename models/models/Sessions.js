var Model = require('../Model.js');

var Sessions = new Model({
	events: {type: 'array'},
	user: {type: 'object'}
})

Sessions.db = [
    {
	    events: [{id: 2, qty: 3}, {id: 1, qty: 4}],
	    user: {id: 1, username: 'admin', admin: true},
	    id: 1
    }
]

module.exports = Sessions;