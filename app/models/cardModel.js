var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var CardSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    bundle: { type: Number, default: 0, required: true },
    lastAnswerAt:  { type: String, default: moment() }
});

module.exports = mongoose.model('Card', CardSchema);