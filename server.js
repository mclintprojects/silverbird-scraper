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
      /*Object.values(description.children('.note').children('a')).forEach(element => {
        console.log(element);
        //movie.genres.push(element.text());
      });*/
      console.log(Object.values(description.children('.note').children('a'))[0].text())
      
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
