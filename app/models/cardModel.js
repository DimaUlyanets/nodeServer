var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    bundle: { type: Number, default: 0, required: true }
});

module.exports = mongoose.model('Card', CardSchema);