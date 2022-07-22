const mongoose = require('mongoose');

const meetingsSchema = mongoose.Schema({
    title: {type: String, required: true},
    decription: {type: String, required: true},
    time: {type: String, required: true},
    userId: {type: String, required: true}
})

module.exports = mongoose.model('Meeting', meetingsSchema);
