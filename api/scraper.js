var request = require('request-promise')
var cheerio = require('cheerio')

const url = 'https://silverbirdcinemas.com/cinema/accra/';

// silverbird listings don't change much so we can cache scrapings (expire: 1 day) to speedup consequent requests
var cache = {}

async function getMovie(id) {
    let response = await getMovies();
    if (response.success) {
        let movie = response.movies.find(movie => {
            return movie.id == id
        });

        // If the movie exists in the cache but we've not scraped Silverbird for its details yet
        if (movie && !movie.details) {
            let details = await getMovieDetails(movie);
            movie.details = details;
        }

        return movie;
    } else {
        return null;
    }
}

// Scrapes a movie's detail page for its cast, director, and synopsis
async function getMovieDetails(movie) {
    return new Promise(async (resolve) => {
        try {
            let html = await request(movie.url);
            const $ = cheerio.load(html);

            let details = {};

            details.header = $('#amy-page-header').children('img').attr('src');
            details.synopsis = $('.entry-content').children('p').first().text();

            let infolist = $('.info-list').children('li');
            details.director = infolist.eq(1).children('span').text();

            details.cast = []
            infolist.first().children('span').children('a').each(function (index, element) {
                details.cast.push(element.children[0].data);
            });

            resolve(details);
        } catch (error) {
            resolve(null);
        }
    });
}

async function getMovies() {
    let date = new Date();
    let cacheId = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;

    let cacheContent = cache[cacheId];
    if (cacheContent) {
        return {
            success: true,
            movies: cacheContent
        };
    } else {
        // scraping does not exist in cache meaning a new day has started and the website hasn't been scraped yet
        // or the app is running for the first time. either way we need to purge the cache of any old entries
        this.cache = {};

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

// Gets the list of movies from the Silverbird Cinema Accra homepage
async function scrapeMovies() {
    return new Promise(async (resolve) => {
        try {
            let html = await request(url);
            const $ = cheerio.load(html);
            let movies = [];

            $('.entry-item').each(function (index, element) {
                let movie = {};

                movie.id = index + 1
                movie.thumbnail = $(this).children('.entry-thumb').children('img').attr('src');

                let content = $(this).children('.entry-content');
                movie.title = content.children('.entry-title').children('a').text();
                movie.rating = content.children('.entry-rating').children('.rate').text();
                movie.url = content.children('.entry-title').children('a').attr('href');
                movie.length = content.children('.entry-date').text();
                movie.showtime = `${content.children('.cinema_page_showtime').children('span').children('strong').text()}${content.children('.cinema_page_showtime').children('strong').text()}`;

                let description = content.children('.desc-mv');
                movie.release = description.children('div').first().text().replace('Release:', '');

                movie.genres = [];
                description.children('.note').children('a').each(function (index, element) {
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

module.exports = {
    getMovies,
    getMovie
}