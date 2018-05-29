<template>
  <div id="app">
	  <keep-alive>
    	<router-view/>
	  </keep-alive>
  </div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style>
:root {
	--primaryColor: #eeeeee;
	--accentColor: rgba(0, 0, 0, 0.3);
	--primaryColorLight: white;
}

* {
	margin: 0;
	padding: 0;
}

#app {
	font-family: 'Rubik', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 60%;
	margin: 0 auto;
	padding: 24px;
	color: rgba(0, 0, 0, 0.8);
}

body {
	background-color: var(--primaryColor);
}

.text-primary-light {
	color: rgba(0, 0, 0, 0.54);
}

.text-secondary {
	color: rgba(255, 255, 255, 0.8);
}

.text-secondary-light {
	color: rgba(255, 255, 255, 0.54);
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

@media screen and (max-width: 576px) {
	#app {
		width: 100%;
		padding: 0px;
	}
}
</style>
