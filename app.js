var bodyParser = require("body-parser");
var express = require('express');
var foodcontroller = require('./controllers/foodcontroller');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

//set up template engine

app.set('view engine','ejs');

// static files
app.use('/assets',express.static('./assets'));

//fire controller
foodcontroller(app);


//listen to port
app.listen(3000);
