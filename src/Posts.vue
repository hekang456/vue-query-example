<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { fetchPostsApi } from './fetch';

defineProps({
	isVisited: {
		type: Function,
		required: true
	}
});
defineEmits(['setPostId']);

const { isPending, isError, isFetching, data, error, refetch } = useQuery({
	queryKey: ['posts'],
	queryFn: fetchPostsApi
});
</script>

<template>
	<h1>Posts</h1>
	<div v-if="isPending">Loading...</div>
	<div v-else-if="isError">An error has occurred: {{ error }}</div>
	<div v-else-if="data">
		<ul>
			<li v-for="item in data" :key="item.id">
				<a
					@click="$emit('setPostId', item.id)"
					href="#"
					:class="{ visited: isVisited(item.id) }"
					>{{ item.title }}</a
				>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.visited {
	font-weight: bold;
	color: green;
}
</style>
