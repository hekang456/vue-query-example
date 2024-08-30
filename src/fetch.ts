import { Ref } from 'vue';
import type { Post } from './types';

export const fetchPostsApi = async (): Promise<Post[]> =>
	await fetch('http://localhost:3000/posts').then((response) => {
		return response.json();
		// throw new Error('error');
	});

export const fetchPostApi = async (id: number): Promise<Post> =>
	await fetch(`http://localhost:3000/posts/${id}`).then((response) =>
		response.json()
	);

export const addPostApi = async (post: Post): Promise<void> => {
	await fetch('http://localhost:3000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(post)
	});
};

export const fetchPageApi = (page: Ref<number>) =>
	fetch(`http://localhost:3000/posts?_page=${page.value}&_limit=10`).then(
		(response) => response.json()
	);
