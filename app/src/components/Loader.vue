<template>
  <img v-if="isLoading" src="http://samherbert.net/svg-loaders/svg-loaders/oval.svg" />    
</template>

<script>
export default {
	props: ['isLoading']
};
</script>

<style>
</style>
