var express = require('express');

var Card = require('./../models/cardModel');
var Deck = require('./../models/deckModel');
var bundles = [0, 1, 2, 3, 4, 5, 6, 7];

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

                } else {
                    res.send(err);
                }
            });
        })
        .get(function (req, res) {

            Deck.findById(req.params.deck_id, function (err, deck) {
                if (err) {
                    res.send(err);
                }
                var cards =  req.params.practice
                    ? deck.cards.filter(function(card) {
                        if (card.bundle === 0)
                            return card;
                    })
                    : deck.cards;

                res.json(cards);
            });
        });

    router.route('/decks/:deck_id/cards/:card_id/answer')
        .post(function (req, res) {

            Deck.findById(req.params.deck_id, function(err, deck){
                if (err) return res.send(500, { error: err });

                if (req.body.right) {
                    deck.cards.id(req.params.card_id).bundle = bundles[deck.cards.id(req.params.card_id).bundle + 1];//moving in next bundle
                } else {
                    deck.cards.id(req.params.card_id).bundle = bundles[0]; //moving in first bundle
                }
                deck.save(function (err) {
                    if (!err) {
                        res.json({message: 'Card answered.'})
                    }
                });
            });

        });
};
