var express = require('express');

var Deck = require('./../models/deck');

module.exports = function (router) {
    'use strict';

    router.route('/decks')
        .post(function (req, res) {
            var deck = new Deck();
            deck.name = req.body.name;

            deck.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'Deck created.'})
            });
        })
        .get(function (req, res) {
            Deck.find(function (err, decks) {
                if (err) {
                    res.send(err);
                }
                res.json(decks);
            });
        });

    router.route('/decks/:deck_id')
        .delete(function (req, res) {
            Deck.remove({
                _id: req.params.deck_id
            }, function(err, deck) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        })
};