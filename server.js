var express = require('express');
var cors = require('cors')
var app = express();
var scraper = require('./scraper')
app.use(cors())

app.get('/movies', async function(request, response) {
    let getMoviesResponse = await scraper.getMovies();
    if (getMoviesResponse.success) {
        response.send({
            movies: getMoviesResponse.movies
        });
    } else {
        response.status(500).send({
            error: 'Something went wrong.'
        });
    }
});

app.get('/movies/:id', async function(request, response){
  let movie = await scraper.getMovie(request.query.id);
  if(movie){
    response.send({movie});
  }else{
    response.status(404).send(
});

var listener = app.listen(process.env.PORT, function() {
    console.log('App is listening on port ' + listener.address().port);
});