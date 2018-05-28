var express = require('express');
var request = require('request')
var cors = require('cors')
var cheerio = require('cheerio')
var app = express();

app.use(cors())

app.get('/movies', (req, response) => {
  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});
