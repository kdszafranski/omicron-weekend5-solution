var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favorites = require('./routes/favorites');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// requests to /public are for static files
app.use('/public', express.static(__dirname + '/public/'));

// Routes
app.use('/favorites', favorites);

// index file request
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/views/index.html");
});


app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});
