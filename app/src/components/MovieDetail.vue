<template>
    <div id="movie-details">
        <loader :isLoading="isLoading" />
        <div v-if="movie != null">
            <div id="movie-header" :style="{'background-image': `url(${movie.details.header})`}">
                <div id="btn-navigate-up" class="flex-row center-vertical center-horizontal" @click="navigateAway">
                    <img src="https://res.cloudinary.com/mclint-cdn/image/upload/v1527581911/twotone-arrow_back-24px.svg" />
                </div>
                <div id="movie-details-inner" class="flex-column">
                    <p id="movie-detail-title">{{movie.title}}</p>
                    <p id="movie-details-rating" class="text-secondary">Rating: {{movie.rating.length === 0 ? '0.0' : movie.rating}} <span  class="text-secondary-light"> / 5</span></p>
                </div>
            </div>
            <div id="movie-details-body">
                <ul id="group-list">
                    <li class="group-title text-primary-light">Release</li>
                    <li class="group-data">{{movie.release}}</li>
                    <li class="group-title text-primary-light">Genre</li>
                    <li class="group-data">{{movie.genres.join(' | ')}}</li>
                    <li class="group-title text-primary-light">Runtime</li>
                    <li class="group-data">{{movie.length}}</li>
                    <li class="group-title text-primary-light">Synopsis</li>
                    <li class="group-data">{{movie.details.synopsis}}</li>
                    <li class="group-title text-primary-light">Director</li>
                    <li class="group-data">{{movie.details.director}}</li>
                    <li class="group-title text-primary-light">Cast</li>
                    <li class="group-data">{{movie.details.cast.join(', ')}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from './Loader';
import axios from 'axios';

export default {
	data() {
		return {
			isLoading: false,
			movie: null
		};
	},
	methods: {
		navigateAway() {
			this.$router.go(-1);
		}
	},
	async activated() {
		this.isLoading = true;
		let id = this.$route.params.id;
		try {
			let response = await axios.get(
				`https://silverbird-scraper.glitch.me/movies/${id}`
			);

			if (response.status == 200) {
				this.isLoading = false;
				this.movie = response.data.movie;
			}
		} catch (error) {}
	},
	components: { Loader }
};
</script>

<style scoped>
#movie-details {
	background: white;
	border-radius: 16px 16px 0px 0px;
}

#movie-header {
	height: 350px;
	background-position: center;
	border-radius: 16px 16px 0px 0px;
}

#movie-detail-title {
	font-size: 22px;
	text-transform: uppercase;
	color: white;
}

#movie-details-inner {
	position: relative;
	top: 68%;
	padding: 16px;
	background: linear-gradient(to right, var(--accentColor), transparent);
}

#movie-details-body {
	padding: 16px;
}

#group-list {
	list-style-type: none;
}

.group-title {
	font-style: bold;
	font-size: 13px;
}

.group-data {
	font-size: 16px;
	margin-bottom: 16px;
}

#btn-navigate-up {
	width: 36px;
	height: 36px;
	background: rgba(255, 255, 255, 0.6);
	border-radius: 50%;
	position: relative;
	top: 16px;
	left: 16px;
}

#btn-navigate-up:hover {
	cursor: pointer;
	background: rgb(86, 214, 182);
}

@media screen and (max-width: 576px) {
	#movie-header {
		height: 240px;
		border-radius: 0px;
	}

	#movie-details-inner {
		top: 52%;
	}

	#app {
		padding: 0px;
		background: white;
	}
}
</style>
