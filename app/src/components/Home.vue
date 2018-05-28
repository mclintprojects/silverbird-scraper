<template>
    <div>
        <h1>Hello world</h1>
        <loader :isLoading="isLoading"></loader>
    </div>
</template>

<script>
import Loader from './Loader';

export default {
	data() {
		return {
			isLoading: true
		};
	},
	components: { Loader }
};
</script>

<style>
</style>
