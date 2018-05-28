# Overview

This API provides the list of currently showing movies at the Silverbird Cinema. It does it by scraping https://silverbirdcinemas.com/cinema/accra/. Silverbird listings rarely change <strong>daily</strong> so the API caches requests (expires: 1 day).

## How does the caching work?

If a request comes in and a scraping has not been performed for that day, the API performs the scraping, caches it and returns a response. Subsequent requests will then proceed to receive the cached scraping for that day.

# Endpoints

<strong>Request:</strong> GET: https://silverbird-scraper.glitch.me/movies <br>
<strong>Response:</strong> 200 | OK<br> `[{ "id": 1, "thumbnail": "https://silverbirdcinemas.com/wp-content/uploads/2018/04/llll-164x220.png", "title": "Sherlock Gnomes", "rating": "4.1", "url": "https://silverbirdcinemas.com/movie/sherlock-gnomes/", "length": "01 hours 26 minutes", "showtime": "FRI - THUR: 10:00AM, 11:40AM, 1:20PM, 3:20PM", "release": "Mar 23, 2018", "genres": [ "Adventure", "Amination", "Comedy", "Now Showing" ] }]`
<br><br>
<strong>Request:</strong> GET: https://silverbird-scraper.glitch.me/movies/:id <br>
<strong>Response:</strong> 200 | OK<br> `{ "movie": { "id": 1, "thumbnail": "https://silverbirdcinemas.com/wp-content/uploads/2018/04/llll-164x220.png", "title": "Sherlock Gnomes", "rating": "4.1", "url": "https://silverbirdcinemas.com/movie/sherlock-gnomes/", "length": "01 hours 26 minutes", "showtime": "FRI - THUR: 10:00AM, 11:40AM, 1:20PM, 3:20PM", "release": "Mar 23, 2018", "genres": [ "Adventure", "Amination", "Comedy", "Now Showing" ], "details": { "synopsis": "Garden gnomes, Gnomeo & Juliet, recruit renowned detective, Sherlock Gnomes, to investigate the mysterious disappearance of other garden ornaments.", "director": "John Stevenson", "cast": [ "Emily Blunt", "James McAvoy", "Johnny Depp", "Kelly Asbury", "Mary J. Blige" ] } } }`
