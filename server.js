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
  let id = request.params.id;
  
  let movie = await scraper.getMovie(id);
  if(movie != null){
    response.send({movie});
  }else{
    response.status(404).send({error: `Could not find a movie with ID: ${id}`});
  }
});

var listener = app.listen(process.env.PORT, function() {
    console.log('App is listening on port ' + listener.address().port);
});