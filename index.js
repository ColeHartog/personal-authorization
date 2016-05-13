var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs"),
    jwt = require("jsonwebtoken"),
    config = require("./config.js");

var userCtrl = require("./controllers/userCtrl.js");

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


mongoose.connect('mongodb://localhost:27017/personal-auth');
mongoose.connection.once('open', function(){
    console.log('Connected to mongodb\n');
});


app.post('/api/login', userCtrl.Login);
app.get('/api/loggedin', userCtrl.LoggedIn);
app.post('/api/register', userCtrl.RegisterNewLogin);









app.listen(3141, function(){
    console.log('\nListening to port 3141\n');
})