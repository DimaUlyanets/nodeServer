var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeckSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Deck', DeckSchema);