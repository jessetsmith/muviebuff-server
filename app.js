require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontroller');
var muvies = require('./controllers/muvieController');
var sequelize = require('./db');

sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/auth', user);

app.use('/muvies', muvies);

app.use(require('./middleware/validate-session'));


app.listen(3000, function(){
    console.log('App is running on 3000.')
});