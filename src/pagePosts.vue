<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { fetchPageApi } from './fetch';

const page = ref(1);
const { isPending, isError, data, error, isFetching, isPlaceholderData } =
	useQuery({
		queryKey: ['posts', page],
		queryFn: () => fetchPageApi(page),
		placeholderData: keepPreviousData
	});
const prevPage = () => {
	page.value = Math.max(page.value - 1, 1);
};
const nextPage = () => {
	if (!isPlaceholderData.value) {
		page.value = page.value + 1;
	}
};
</script>

<template>
	<h1>Posts</h1>
	<p>Current Page: {{ page }} | Previous data: {{ isPlaceholderData }}</p>
	<button @click="prevPage">Prev Page</button>
	<button @click="nextPage">Next Page</button>
	<div v-if="isPending">Loading...</div>
	<div v-else-if="isError">An error has occurred: {{ error }}</div>
	<div v-else-if="data">
		<ul>
			<li v-for="item in data.data" :key="item.id">
				{{ item.title }}
			</li>
		</ul>
	</div>
</template>
