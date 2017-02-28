var Model = require('../Model.js');

var Events = new Model({
    name: {type: "string", unique: true, required: true},
    startDate: {type: "string", required: true},
    endDate: {type: "string", required: true},
    subjects: {type: "array", subType: "string", required: true},
    type: {type: "array", subType: "string", required: true},
    image: {type: "string", required: true},
    description: {type: "string", required: true},
    price: {type: "number", required: true}
})

Events.db = [
    {
        id: 1,
        eventIDs : 1,
        name: "SuperCodeCamp",
        startDate: '27/05/2017, 08:00 AM',
        endDate: '27/08/2017, 08:00 PM',
        subjects: ['Node.js', 'express.js', 'mongoDB'],
        type: ['Full stack', 'Three months'],
        image: 'https://i2.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/04/students-in-classroom.jpg?zoom=1.5&fit=564%2C388',
        description: 'This is a code camp',
        price: 3000
    },
    {
        id: 2,
        eventIDs : 2,
        name: "Workshop",
        startDate: '27/05/2017, 08:00 AM',
        endDate: '28/05/2017, 08:00 PM',
        subjects: ['Node.js', 'express.js', 'mongoDB', 'javascript'],
        type: ['Full stack', 'Two days'],
        image: 'https://i2.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/04/students-in-classroom.jpg?zoom=1.5&fit=564%2C388',
        description: 'This is a workshop',
        price: 300
    }
]

module.exports = Events;