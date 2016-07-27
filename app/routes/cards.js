var express = require('express');

var Card = require('./../models/card');
var Deck = require('./../models/deck');

module.exports = function (router) {
    'use strict';

    router.route('/decks/:deck_id/cards')
        .post(function (req, res) {
            var card = {};
            card.question = req.body.question;
            card.answer = req.body.answer;

            Deck.findById(req.params.deck_id, function (err, deck) {
                if (!err) {
                    deck.cards.push(card);
                    deck.save(function (err) {
                       if (!err) {
                           res.json({message: 'Card created.'})
                       }
                    });

                }else {
                    res.send(err);
                }
            });
        })
        .get(function (req, res) {

            Deck.findById(req.params.deck_id, function (err, deck) {
                if (err) {
                    res.send(err);
                }
                res.json(deck.cards);
            });
        });

    router.route('/decks/:deck_id/cards/:card_id/answer')
        .post(function (req, res) {

            Deck.findById(req.params.deck_id, function(err, deck){
                if (err) return res.send(500, { error: err });
                deck.cards.id(req.params.card_id).right = req.body.right;
                deck.save(function (err) {
                    if (!err) {
                        res.json({message: 'Card answered.'})
                    }
                });
            });

        });
};
