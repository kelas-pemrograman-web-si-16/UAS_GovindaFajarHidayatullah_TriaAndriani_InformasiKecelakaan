var express = require('express');
var crypto = require('crypto')

var berita = require('../model/berita')
var User = require('../model/user')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/admin', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('users/home', { session_store: session_store, users: user })
    }).select('username email firstname lastname users createdAt updatedAt')
});

/* GET users listing. */
router.get('/datakecelakaan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    berita.find({}, function(err, berita) {
        console.log(berita);
        res.render('users/berita/table', { session_store: session_store, beritas: berita })
    }).select('_id WaktuKejadian NamaKorban AlamatKejadian KronologisKejadian  created_at')
});

/* GET users listing. */
router.get('/inputinformasikecelakaan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('users/berita/input_data', { session_store: session_store})
});

//input data berita
router.post('/inputinformasikecelakaan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    berita.find({ WaktuKejadian: req.body.WaktuKejadian }, function(err, Berita) {
        if (Berita.length == 0) {
            var datakecelakaan = new berita({
                WaktuKejadian: req.body.WaktuKejadian,
                NamaKorban: req.body.NamaKorban,
                AlamatKejadian: req.body.AlamatKejadian,
                KronologisKejadian: req.body.KronologisKejadian,
            })
            datakecelakaan.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datakecelakaan')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datakecelakaan')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, nama korban sudah ada....')
            res.render('users/Berita/input_data', {
                session_store: session_store,
                WaktuKejadian: req.body.WaktuKejadian,
                NamaKorban: req.body.NamaKorban,
                AlamatKejadian: req.body.AlamatKejadian,
                KronologisKejadian: req.body.KronologisKejadian,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editinformasikecelakaan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    berita.findOne({ _id: req.params.id }, function(err, Berita) {
        if (Berita) {
            console.log("beritas"+Berita);
            res.render('users/berita/edit_data', { session_store: session_store, beritas: Berita})
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datakecelakaan')
        }
    })
})

router.post('/:id/editinformasikecelakaan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    berita.findById(req.params.id, function(err, berita) {
        berita.WaktuKejadian = req.body.WaktuKejadian;
        berita.NamaKorban = req.body.NamaKorban;
        berita.AlamatKejadian = req.body.AlamatKejadian;
        berita.KronologisKejadian = req.body.KronologisKejadian;

        berita.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/datakecelakaan');

        });
    });
})

router.post('/:id/delete', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    berita.findById(req.params.id, function(err, berita){
        berita.remove(function(err, Berita){
            if (err)
            {
                req.flash('msg_error', 'Maaf, kayaknya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data Kecelakaan berhasil dihapus!');
            }
            res.redirect('/datakecelakaan');
        })
    })
})

module.exports = router;
