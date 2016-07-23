// BASE SETUP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var Card = require('./models/card');

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

router.route('/cards')
    .post(function(req, res) {
        var card = new Card();
        console.log('New card', req.body.question)
        card.question = req.body.question;
        card.answer = req.body.answer;

        card.save(function(err) {
            if(err) {
                res.send(err);
            }

            res.json({message: 'Card created.'})
        });
    })
    .get(function(req, res) {
        Card.find(function(err, cards) {
            if (err) {
                res.send(err);
            }
            res.json(cards);
        });
    });


app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening ' + port);
