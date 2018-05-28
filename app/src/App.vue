<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 40%;
	margin: 0 auto;
	padding: 24px;
	color: rgba(0, 0, 0, 0.8);
}

body {
	background-color: #cfd6d8;
}

.text-secondary {
	color: rgba(0, 0, 0, 0.54);
}

.flex-column {
	display: flex;
	flex-direction: column;
}

.flex-row {
	display: flex;
	flex-direction: row;
}

.center-horizontal {
	justify-content: center;
}

.center-vertical {
	align-items: center;
}

@media screen and (max-width: 576px), (max-width: 768px) {
	#app {
		width: 100%;
		padding: 16px;
	}
}
</style>
