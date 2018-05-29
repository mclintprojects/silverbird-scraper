<template>
  <img v-if="isLoading" src="https://res.cloudinary.com/mclint-cdn/image/upload/v1527585407/Rolling-3s-200px.svg" />    
</template>

<script>
export default {
	props: ['isLoading']
};
</script>

<style scoped>
img {
	position: absolute;
	top: calc(50% - 24px);
	left: calc(50% - 24px);
	width: 48px;
	height: 48px;
}
</style>
