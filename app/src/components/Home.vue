<template>
    <div id="home-container">
        <loader :isLoading="isLoading" />
		<h1>Now showing</h1>
		<p class="text-primary-light">Silverbird Cinemas, Accra</p>

		<ul id="movies">
			<li v-for="(movie, index) in movies" :key="index">
				<movie :movie="movie" />
			</li>
		</ul>
    </div>
</template>

<script>
import Loader from './Loader';
import Movie from './Movie';
import axios from 'axios';

export default {
	data() {
		return {
			isLoading: true,
			movies: []
		};
	},
	async created() {
		try {
			let response = await axios.get(
				'https://silverbird-scraper.glitch.me/movies'
			);

			if (response.status == 200) {
				this.movies = response.data.movies;
				this.isLoading = false;
			}
		} catch (error) {
			console.log(error);
		}
	},
	components: { Loader, Movie }
};
</script>

<style>
#movies {
	margin: 0 auto;
	margin-top: 24px;
}

#movies li {
	margin-bottom: 24px;
	list-style-type: none;
}

@media screen and (max-width: 576px) {
	#home-container > h1,
	#home-container > p {
		margin-left: 16px;
	}

	#home-container h1 {
		margin-top: 16px;
	}

	#movies {
		margin-top: 16px;
	}
}
</style>
