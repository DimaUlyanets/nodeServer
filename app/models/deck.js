var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cards = require('./card').schema;

var bundles = ['ready', '1h', '4h', '24h', '3d', '7d', '3w', '1m'];
var DeckSchema = new Schema({
    name: String,
    cards: [Cards]
});

module.exports = mongoose.model('Deck', DeckSchema);