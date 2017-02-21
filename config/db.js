// connect to DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/product-cart')

// require models
// require("../models/event.js")
// require("../models/eventsDB.js")
// require("../models/eventsID.js")
// require("../models/model.js")
// require("../models/serverModelTest.js")

require("../models/dummyModel.js")