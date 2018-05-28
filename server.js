var express = require('express');
var request = require('request-promise')
var cors = require('cors')
var cheerio = require('cheerio')
var app = express();
var url = 'https://silverbirdcinemas.com/cinema/accra/';

app.use(cors())

app.get('/movies', async function(req, response){
  try{
    let html = await request(url);
    const $ = cheerio.load(html);
    let movies = [];
    
    $('.entry-item').each(function(index, element){
      let movie = {};
      movie.thumbnail = $(this).children('.entry-thumb img').attr('src')
      
      movies.push(movie)
    });
    
    response.send({movies});
  }
  catch(error){
    response.status(500).send({error});
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});
