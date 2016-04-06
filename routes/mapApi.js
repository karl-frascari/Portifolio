var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

var Point = require('../models/Points');

router.post('/point', function(req, res) {

    if(!req.body.base64 || !req.body.base64){
        res.status(500);
        res.send('You shall not pass');
    }

    new Point({
        base64: req.body.base64,
        position: req.body.position    
    }).save();

    res.send({ 'new point': req.body.action });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
});

router.get('/points', function(req, res) {
    Point.find(function(err, result) {
        res.send(result);
    });
});

module.exports = router;
