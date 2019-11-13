var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create({
        username: username,
        password: bcrypt.hashSync(pass, 10)
    })
    .then(
        function auth (user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError (error) {
            res.send(500, error.message)
        }
    );  
});

router.post('/login', function(req, res) {
    User.findOne({where: {username: req.body.user.username}}).then(
    user => {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches){
                    var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: 'Successfully Authenticated',
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({error: "failed to authenticate"});
                }
            });
        
        }else{
            res.status(500).send({error: "unable to authenticate"});
    } 
    },
    function (err){
        res.status(501).send({error: "authentication failure"});
    }
);
});


module.exports = router;