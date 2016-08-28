var express = require('express');
var router = express.Router();
var pg = require('pg');
var connect = require('../connection');

router.get('/count', function(req, res) {
  console.log("here");
  pg.connect(connect, function(err, client, done) {
    client.query('SELECT COUNT(id) as count FROM favorites',
      function(err, result) {
        done();

        if(err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.send(result.rows[0].count);
        }
    });
  });
});

router.get('/', function(req, res) {
      pg.connect(connect, function(err, client, done) {
        client.query('SELECT * FROM favorites ORDER BY id DESC',
          function(err, result) {
            done();

            if(err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.send(result);
            }
        });
    });
});

router.post('/', function(req, res) {
    pg.connect(connect, function(err, client, done) {
        client.query(
            'INSERT INTO favorites (petfinder_id, pet_name, pet_description, pet_image_url) ' +
            'VALUES ($1, $2, $3, $4)',
        [req.body.petID, req.body.petName, req.body.description, req.body.image],
        function(err, result) {
          done();

          if(err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    });

});

module.exports = router;
