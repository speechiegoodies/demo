<script setup lang="ts">
import { computed, inject } from "vue";
import { entriesKey } from "@/providers";

const entries = inject(entriesKey)!; // we know the app will always provide

type TitleWithTags = { title: string; tags: string[] };
const titlesAndTags = computed<TitleWithTags[]>(() => {
	if (entries.value === null) {
		return [];
	}

	// Process raw tabular entries into titles with tags format
	return entries.value.map((entry) => {
		const separatedTags = entry.tags.split(",").map((tag) => tag.trim());
		return {
			title: entry.title,
			tags: separatedTags,
		};
	});
});
</script>

<template>
	<main>
		<h1>Hello World!</h1>

		<!-- create a section for every entry -->
		<details v-for="section of titlesAndTags" :key="section.title">
			<summary>{{ section.title }}</summary>
			<!-- list the tags -->
			<ul>
				<li v-for="(tag, index) of section.tags" :key="index">{{ tag }}</li>
			</ul>
		</details>
	</main>
</template>

<style scoped>
/* TODO: style the details */
</style>
