var express = require('express');

var Card = require('./../models/card');

module.exports = function (router) {
    'use strict';

    router.route('/decks/:deck_id/cards')
        .post(function (req, res) {
            var card = new Card();
            card.question = req.body.question;
            card.answer = req.body.answer;
            card.deckId = req.params.deck_id;

            card.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'Card created.'})
            });
        })
        .get(function (req, res) {
            Card.find({deckId: req.params.deck_id}, function (err, cards) {
                if (err) {
                    res.send(err);
                }
                res.json(cards);
            });
        });

    router.route('/decks/:deck_id/cards/:card_id/answer')
        .post(function (req, res) {
            var query = {'_id': req.params.deck_id};
            Card.findOneAndUpdate(query, {right: req.body.right}, {upsert:true}, function(err, doc){
                if (err) return res.send(500, { error: err });
                return res.send("succesfully saved");
            });
            
        });
};
