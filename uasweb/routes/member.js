var express = require('express');
var crypto = require('crypto')

var berita = require('../model/berita')
var User = require('../model/user')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/member', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('users/home', { session_store: session_store, users: user })
    })
});


/* GET users listing. */
router.get('/datakecelakaanmember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    berita.find({}, function(err, berita) {
        console.log(berita);
        res.render('users/berita/table', { session_store: session_store, beritas: berita })
    }).select('_id WaktuKejadian NamaKorban AlamatKorban KronologisKejadian created_at')
});

module.exports = router;
