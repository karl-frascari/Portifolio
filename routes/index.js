var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

// var Database = mongoose.model('Database');

// var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });


router.get('/', function(req, res) {
    res.render('index');
});

// router.get('/posts', function(req, res, next) {
//     Database.find(function(err, posts) {
//         if (err) {
//             return next(err);
//         }

//         res.json(posts);
//     });
// });

// router.post('/posts', auth, function(req, res, next) {
//     var post = new Database(req.body);
//     post.author = req.payload.username;

//     post.save(function(err, post) {
//         if (err) {
//             return next(err); }

//         res.json(post);
//     });
// });

// router.param('post', function(req, res, next, id) {
//     var query = Database.findById(id);

//     query.exec(function(err, post) {
//         if (err) {
//             return next(err); }
//         if (!post) {
//             return next(new Error("can't find post")); }

//         req.post = post;
//         return next();
//     });
// });

 module.exports = router;
