var express = require('express');
var request = require('request-promise')
var cors = require('cors')
var cheerio = require('cheerio')
var app = express();
var url = 'https://silverbirdcinemas.com/cinema/accra/';
var cache = []

app.use(cors())

app.get('/movies', async function(req, response){
  try{
    let movies = getMovies()
    response.send({movies});
  }
  catch(error){
    response.status(500).send({error});
  }
});

function getMovies(){
  let date = Date()
  let cacheId = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`
  
  if()
}

async function scrapeMovies(){
    let html = await request(url);
    const $ = cheerio.load(html);
    let movies = [];
    
    $('.entry-item').each(function(index, element){
      let movie = {};
      
      movie.id = index + 1
      movie.thumbnail = $(this).children('.entry-thumb').children('img').attr('src');
      
      let content = $(this).children('.entry-content');
      movie.title = content.children('.entry-title').children('a').text();
      movie.url = content.children('.entry-title').children('a').attr('href');
      movie.length = content.children('.entry.date').text();
      movie.showtime = `${content.children('.cinema_page_showtime').children('span').children('strong').text()}${content.children('.cinema_page_showtime').children('strong').text()}`;
      
      let description = content.children('.desc-mv');
      movie.release = description.children('div').slice(0, 1).text().replace('Release:', '');
      
      movie.genres = [];
      description.children('.note').children('a').each(function(index, element){
        movie.genres.push(element.children[0].data)
      });
      
      movies.push(movie)
    });
  
  return movies;
}

var listener = app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});
