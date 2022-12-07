<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import { entriesKey } from "@/providers";

const entries = inject(entriesKey)!; // we know the app will always provide

// TODO: move this into FetchData & update Entries type
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

// Filter by tags
const searchTerms = ref("");
watch(searchTerms, () => console.log(searchTerms.value));

// functions with/without block statements
// () => {} // return undefined
// () => 1 // return 1
// () => { 1 } // return undefined
// () => { return 1 }

// nullish-coalescing ?? vs falsy short-circuit ||
// undefined ?? 1  => 1
// 'test' ?? 1 => 'test'
// 0 || 1 => 1
// false || 1 => 1
// '' || 1 => 1
// false ?? 1 => false

// Very basic filter by text matching
const filteredTilesWithTags = computed<TitleWithTags[]>(() => {
	if (!searchTerms.value) {
		return titlesAndTags.value;
	}

	const splitSearchTerms = searchTerms.value.split(/[ ,;\n]+/g).filter(Boolean); // filter out falsy values

	return titlesAndTags.value.filter((entry) =>
		splitSearchTerms.every((term) => entry.tags.join(" ").includes(term))
	);
});

/**
 * TODO: explore colouring tags based on their tagname
 */
function ComputeTagColour(tag: string) {
	const hueFromTag = 0; // somehow convert tag to 0-360
	return `hsv(${hueFromTag}, 1.0, 1.0)`;
	// :style="{ color: ComputeTagColor(tag) }"
}
</script>

<template>
	<main>
		<h1>Hello World!</h1>

		<div class="search-box">
			<input v-model="searchTerms" />
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
				<path
					d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
				/>
			</svg>
		</div>

		<!-- create a section for every entry -->
		<details v-for="section of filteredTilesWithTags" :key="section.title">
			<summary>
				{{ section.title }}

				<!-- list the tags -->
				<ul class="tags">
					<li v-for="(tag, index) of section.tags" :key="index">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
							<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
							<path
								d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 96c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
							/>
						</svg>
						{{ tag }}
					</li>
				</ul>
			</summary>

			<!-- TODO: description -->
		</details>
	</main>
</template>

<style scoped>
/* Style the search input */
input {
	border: none;
	outline: none !important; /*removes yucky highlight*/
	color: inherit;
	padding: 0;
	background: transparent;
}

.search-box {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 0.5rem;
	padding: 0.25em 0.5em;
	width: fit-content;
	display: flex;
	align-items: center;
	margin: 1rem 0;
}

.search-box > svg {
	margin-left: 0.25em;
	font-size: 80%;
	width: 1em;
	height: 1em;
	fill: currentColor;
	opacity: 0.5;
}

/* Style the details */
details > summary {
	list-style: none;
}
details > summary::before {
	content: "➤";
	display: inline-block;
	margin-right: 0.5em;
	opacity: 0.5;
	transition: transform 0.5s ease;
}
details[open] > summary::before {
	transform: rotate(90deg);
}

.tags {
	display: inline-flex;
	flex-wrap: wrap;
	list-style: none;
	opacity: 0.5;
	padding: 0;
	margin-left: 1rem;
	gap: 0.75em;
}
.tags li {
	display: flex;
	align-items: center;
	gap: 0.25em;
}
.tags svg {
	font-size: 80%;
	width: 1em;
	height: 1em;
	fill: currentColor;
}
</style>
