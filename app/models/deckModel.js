var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cards = require('./cardModel').schema;

var DeckSchema = new Schema({
    name: { type: String, required: true },
    cards: [Cards]
});

module.exports = mongoose.model('Deck', DeckSchema);