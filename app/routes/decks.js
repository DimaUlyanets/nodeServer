var express = require('express');

var Deck = require('./app/models/deck');
module.exports = function (router) {
    'use strict';

    router.route('/decks')
        .post(function (req, res) {
            var deck = new Deck();
            console.log('New deck', req.body.question)
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
}