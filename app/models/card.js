var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    question: String,
    answer: String,
    deckId: String,
    right: Boolean,
    bundle: String
});

module.exports = mongoose.model('Card', CardSchema);