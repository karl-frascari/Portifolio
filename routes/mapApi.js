var express = require('express');
var app = express();
var router = express.Router();

var Point = require('../models/Points');

router.post('/point', function(req, res) {
    new Point({ action: req.body.action, author: req.body.author }).save();
    res.send({ 'new todo': req.body.action });
});

router.get('/points', function(req, res) {
    Point.find(function(err, result) {
        res.send(result);
    });
});

module.exports = router;
