var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favorites = require('./routes/favorites');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/favorite', favorites);

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));


app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});