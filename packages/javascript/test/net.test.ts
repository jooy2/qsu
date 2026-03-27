import assert from 'assert';
import { describe, it } from 'node:test';
import { fetchData } from '../dist/node';

describe('Net', () => {
	it('fetchData', async () => {
		const testHost = 'https://jsonplaceholder.typicode.com';

		const responseGet = await fetchData('/posts/1', {
			host: testHost
		});

		assert.deepStrictEqual(responseGet.id, 1);

		const responsePost = await fetchData('/posts', {
			post: true,
			host: testHost,
			body: { title: 'foo', body: 'bar', userId: 1 }
		});

		assert.deepStrictEqual(responsePost.id, 101);
	});
});
