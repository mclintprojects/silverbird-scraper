<template>
    <div class="movie flex-row" @click="navigateToDetails">
        <div class="thumbnail-container flex-row">
            <img :src="movie.thumbnail" class="thumbnail" />
        </div>

        <div class="movie-content flex-column">
            <p class="movie-title">{{movie.title}}</p>
            <ul class="movie-genres flex-row">
                <li class="movie-genre text-primary-light" v-for="(genre, index) in movie.genres" :key="index">{{genre}}</li>
            </ul>
            <div class="flex-row center-vertical">
                <img class="icon" src="https://res.cloudinary.com/mclint-cdn/image/upload/v1527545973/twotone-remove_red_eye-24px.svg" />
                <p class="movie-showtime text-primary-light">{{movie.showtime}}</p>
            </div>
            <div class="flex-row center-vertical">
                <img class="icon" src="https://res.cloudinary.com/mclint-cdn/image/upload/v1527549057/twotone-timelapse-24px.svg" />
                <p class="movie-showtime text-primary-light">{{movie.length}}</p>
            </div>
            <div class="flex-row"><p class=movie-rating>Rating: {{movie.rating.length === 0 ? '0.0' : movie.rating}} <span  class="text-primary-light"> / 5</span></p></div>
        </div>
    </div>
</template>

<script>
export default {
	props: ['movie'],
	methods: {
		navigateToDetails() {
			this.$router.push({
				name: 'details',
				params: { id: this.movie.id }
			});
		}
	}
};
</script>

<style>
.thumbnail-container {
	padding: 16px;
	justify-content: center;
	align-items: center;
}

.movie {
	border-radius: 16px;
	background: var(--primaryColorLight);
	transition: all 1.5s;
	box-shadow: 0px 4px 6px 3px rgba(153, 153, 153, 0.1);
}

.movie:hover {
	background: rgb(161, 161, 161);
	filter: grayscale(100%);
	cursor: pointer;
}

.thumbnail {
	border: 0px solid transparent;
	border-radius: 16px;
	object-fit: cover;
}

.movie-content {
	width: 100%;
	margin: 16px;
}

.movie-title {
	font-style: bold;
	font-size: 22px;
	text-transform: capitalize;
}

.movie-genres {
	margin-top: 8px;
}

.movie-genre {
	padding: 4px;
	margin-right: 16px;
	border-radius: 4px;
	font-size: 12px;
	text-transform: uppercase;
	font-style: bold;
	background: var(--accentColor);
}

.movie-showtime {
	font-size: 14px;
	margin-left: 8px;
}

.movie-rating {
	font-style: bold;
	margin-top: 32px;
}

@media screen and (max-width: 576px) {
	.movie-title {
		font-size: 18px;
	}

	.movie-content {
		margin-right: 16px;
	}

	.thumbnail {
		width: 100%;
		height: 150px;
	}

	.thumbnail-container {
		padding-bottom: 0px;
	}

	.movie-genre {
		margin-right: 8px;
		font-size: 10px;
	}

	.movie-genres {
		flex-wrap: wrap;
	}

	.movie {
		flex-direction: column;
		border-radius: 0px;
	}

	.icon {
		height: 16px;
	}

	.movie-showtime {
		font-size: 10px;
		width: 85%;
	}
}
</style>
