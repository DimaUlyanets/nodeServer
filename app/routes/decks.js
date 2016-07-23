var express = require('express');

var Card = require('./app/models/card');

express.Router.route('/cards')
    .get(function(req, res, next) {
        // Logic for GET /users routes
    }).post(function(req, res, next) {
    // Create new user
});