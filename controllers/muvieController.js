const router = require('express').Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const MuvieModel = sequelize.import('../models/muvies');
const validateSession = require('../middleware/validate-session');


router.post('/post', (req, res) => {

    MuvieModel
    .create({
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        description: req.body.description,
        publicRating: req.body.publicRating,
        watched: req.body.watched,
        userRating: req.body.userRating
    })
    .then(
        createSuccess = (muvie) => {
            res.json({
                muvie: muvie
            });
        },
        createError = (err) => {
            res.send(500, err.message);
        }
    );
});

router.get('/mymuvies', (req, res) => {
    

    MuvieModel
    .findAll()
    .then(
        findSuccess = (muvies) => {
            res.json(muvies);
        },
        findError = (err) => {
            res.send(500, err.message);
        }
    );
});

router.get('/mymuvies/:title', (req, res) => {
    var muvie = req.params.id;
    var userId = req.user.id;

    MuvieModel
    .findOne({
        where: {title: req.params.title}
    })
    .then(fineOneSuccess = (results) => {
        res.json(results);
    },
    findOneError = (err) => {
        res.send(500, err.message)
    });
});

router.put('/mymuvies/:title', validateSession, (req, res) => {
    var muvie = req.params.id;

    MuvieModel
    .update({
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        description: req.body.description,
        criticRating: req.body.publicRating,
        watched: req.body.watched,
        userRating: req.body.userRating
    },
    {where: {title: req.params.title}}
    ).then (
        updateSuccess = (newMuvie) => {
            res.json ({
                muvie: newMuvie
            });
        },
        updateError = (err) => {
            res.send(500, err.message)
        }
    );
});

router.delete('/mymuvies/:title', validateSession, (req, res) => {
    var muvie = req.params.id;
    var userId = req.user.id;

    MuvieModel
    .destroy({
        where: {title: req.params.title}
    })
    .then(
        deleteSuccess = (byeMuvie) => {
            res.send(200, 'Muvie Destroyd');
        },
        deleteError = (err) => {
            res.send(500, err.message)
        }
    )
})

module.exports = router;