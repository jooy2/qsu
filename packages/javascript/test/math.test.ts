import assert from 'assert';
import { describe, it } from 'node:test';
import { numPick, numUnique, sum, mul, sub, div } from '../dist';

describe('Math', () => {
	it('numPick', () => {
		assert.strictEqual(typeof numPick(1, 60) === 'number', true);
		for (let i = 0; i < 50; i += 1) {
			const offsetTest: number = numPick(5, 10);
			assert(offsetTest >= 5 && offsetTest <= 10);
		}
	});

	it('numUnique', () => {
		assert.strictEqual(typeof numUnique() === 'number', true);

		const uniqSets = new Set();

		for (let i = 0; i < 100; i += 1) {
			const uniq = numUnique();

			if (uniqSets.has(uniq)) {
				throw new Error('Duplicate number generated');
			} else {
				uniqSets.add(uniq);
			}
		}
	});

	it('sum', () => {
		assert.strictEqual(sum(1, 2, 3, 4), 10);
		assert.strictEqual(sum([1, 2, 3]), 6);
		assert.strictEqual(sum(1234), 1234);
	});

	it('mul', () => {
		assert.strictEqual(mul(1, 2, 3, 4), 24);
		assert.strictEqual(mul([1, 2, 3]), 6);
		assert.strictEqual(mul(1, 5, 7, 0, 9), 0);
		assert.strictEqual(mul(1234), 1234);
	});

	it('sub', () => {
		assert.strictEqual(sub(100, 10, 20, 30), 40);
		assert.strictEqual(sub([10, 20, 30]), -40);
		assert.strictEqual(sub(1, 3, 5, -7, -9), 9);
		assert.strictEqual(sub(1234), 1234);
	});

	it('div', () => {
		assert.strictEqual(div(100, 2, 2, 5), 5);
		assert.strictEqual(div([10, 2, 5]), 1);
		assert.strictEqual(div(1234), 1234);
	});
});
