<script setup lang="ts">
import { onMounted } from "vue";
import { FetchData } from "../helpers/GoogleSheets";

const msg = { value: "Help me" };

onMounted(async () => {
	await FetchData();
});
</script>

<template>
	<div class="about">
		<h1>This is an about page, {{ msg }}</h1>
	</div>
</template>

<style>
@media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
}
</style>
