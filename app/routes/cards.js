var express = require('express');
var moment = require('moment');

var Card = require('./../models/cardModel');
var Deck = require('./../models/deckModel');

var bundles = [
    {period:0, name: 'now', key:0},
    {period:60, name: '1 hour', key:1},
    {period:14400, name: '4 hours', key:2},
    {period:86400, name: '1 day', key:3},
    {period:4, name: '3 days', key:4},
    {period:5, name: '1 week', key:5},
    {period:6, name: '3 weeks', key:6},
    {period:7, name: '1.5 months', key:7}
];
console.log(moment().add(3600, 'seconds').format())
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
            res.end();
        })
        .get(function (req, res) {

            Deck.findById(req.params.deck_id, function (err, deck) {
                if (err) {
                    res.send(err);
                }
                var cards = req.query.practice
                    ? deck.cards.filter(function(card) {
                        var timeCardReady = moment(card.lastAnswerAt).add(bundles[card.bundle].period, 'seconds');
                        var cardIsReady = timeCardReady.isBefore(moment());
                    console.log('lastAnswer/ready/now', moment(card.lastAnswerAt).format(), timeCardReady.format(), moment().format());
                        if (card.bundle === 0 || cardIsReady)
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
                var card = deck.cards.id(req.params.card_id);
                if (req.body.right) {
                    card.bundle = bundles[card.bundle + 1].key;//moving in next bundle
                } else {
                    card.bundle = bundles[0].key; //moving in first bundle
                }
                card.lastAnswerAt = moment();
                deck.save(function (err) {
                    if (!err) {
                        res.json({message: 'Card answered.'})
                    }
                });
            });

        });
};
