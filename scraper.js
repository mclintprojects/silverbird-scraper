var request = require('request-promise')
var cheerio = require('cheerio')
const url = 'https://silverbirdcinemas.com/cinema/accra/';
var cache = {}

async function getMovie(id){
  let response = await getMovies();
  if(response.success){
    let movie = response.movies[id - 1];
    if(movie.details){
      return movie.details;
    }else{
      let details = await getMovieDetails(movie.url);
      movie.details = details;
      return details;
    }
  }else{
    return null;
  }
}

async function getMovieDetails(movieUrl

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
            movie.url = content.children('.entry-title').children('a').attr('href');
            movie.length = content.children('.entry.date').text();
            movie.showtime = `${content.children('.cinema_page_showtime').children('span').children('strong').text()}${content.children('.cinema_page_showtime').children('strong').text()}`;

            let description = content.children('.desc-mv');
            movie.release = description.children('div').slice(0, 1).text().replace('Release:', '');

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