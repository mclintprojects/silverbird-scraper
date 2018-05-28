var request = require('request-promise')
var cheerio = require('cheerio')
const url = 'https://silverbirdcinemas.com/cinema/accra/';
var cache = {}

async function getMovie(id){
  let response = await getMovies();
  if(response.success){
    let movie = response.movies.find(movie => {return movie.id == id});
    
    if(movie && !movie.details){
      let details = await getMovieDetails(movie);
      movie.details = details;
    }
    
    return movie;
  }else{
    return null;
  }
}

async function getMovieDetails(movie){
  return new Promise(async (resolve) => {
    try{
      let html = await request(movie.url);
      const $ = cheerio.load(html);
      
      let details = {};
      
      details.synopsis = $('.entry-content').children('p').first().text();
      let infolist = $('.info-list').children('li');
      details.director = infolist.eq(1).children('span').text();
      
      details.cast = []
      infolist.first().children('span').children('a').each(function(index, element){
        details.cast.push(element.children[0].data);
      });
      
      details.cinemas = []
      infolist.last().children('a').each(function(index, element){
        details.cinemas.push(element.children[0].data);
      });
      
      resolve(details);
    }catch(error){
      console.log(error);
      resolve(null);
    }
  });
}

async function getMovies() {
    let date = new Date()
    let cacheId = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`

    let cacheContent = cache[cacheId];
    if (cacheContent) {
        return {
            success: true,
            movies: cacheContent
        };
    } else {
        let movies = await scrapeMovies();
        if (movies.length > 0) {
            cache[cacheId] = movies
            return {
                success: true,
                movies
            };
        } else {
            return {
                success: false
            };
        }
    }
}

async function scrapeMovies() {
  return new Promise(async (resolve) => {
    try {
        let html = await request(url);
        const $ = cheerio.load(html);
        let movies = [];

        $('.entry-item').each(function(index, element) {
            let movie = {};

            movie.id = index + 1
            movie.thumbnail = $(this).children('.entry-thumb').children('img').attr('src');

            let content = $(this).children('.entry-content');
            movie.title = content.children('.entry-title').children('a').text();
            movie.rating = content.children('.entry-rating').children
            movie.url = content.children('.entry-title').children('a').attr('href');
            movie.length = content.children('.entry.date').text();
            movie.showtime = `${content.children('.cinema_page_showtime').children('span').children('strong').text()}${content.children('.cinema_page_showtime').children('strong').text()}`;

            let description = content.children('.desc-mv');
            movie.release = description.children('div').first().text().replace('Release:', '');

            movie.genres = [];
            description.children('.note').children('a').each(function(index, element) {
                movie.genres.push(element.children[0].data)
            });

            movies.push(movie)
        });

        resolve(movies);

    } catch (error) {
        resolve([])
    }
  });
}

module.exports = {getMovies, getMovie}