// BASE SETUP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.disable('etag');

var port = process.env.PORT || 8081;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
   res.json({message: 'testing server'});
});

require('./app/routes/cards')(router);
require('./app/routes/decks')(router);

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening ' + port);
