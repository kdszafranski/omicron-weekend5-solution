var express = require('express');
var router = express.Router();
var pg = require('pg');
var connect = require('../connection');

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connect, function(err, client, done) {
        var query = client.query('SELECT * FROM favorites ORDER BY id DESC');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

router.post('/', function(req, res) {
    pg.connect(connect, function(err, client, done) {
        client.query(
            'INSERT INTO favorites (pet_id, pet_name, short_description, img_url) ' +
            'VALUES ($1, $2, $3, $4)',
        [req.body.petID, req.body.petName, req.body.description, req.body.image]
        );
        res.send('posted');
    });

});

module.exports = router;