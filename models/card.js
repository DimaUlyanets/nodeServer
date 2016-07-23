var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    question: String,
    answer: String
});

module.exports = mongoose.model('Card', CardSchema);