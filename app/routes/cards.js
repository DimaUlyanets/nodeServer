var express = require('express');

var Card = require('./app/models/card');

module.exports = function () {
    'use strict';
    
    express.Router.route('/cards')
        .post(function (req, res) {
            var card = new Card();
            console.log('New card', req.body.question)
            card.question = req.body.question;
            card.answer = req.body.answer;

            card.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'Card created.'})
            });
        })
        .get(function (req, res) {
            Card.find(function (err, cards) {
                if (err) {
                    res.send(err);
                }
                res.json(cards);
            });
        });

};
