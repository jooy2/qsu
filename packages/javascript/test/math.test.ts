import assert from 'assert';
import { describe, it } from 'node:test';
import { numPick, numUnique, sum, mul, sub, div, clamp, round } from '../dist';

describe('Math', () => {
	it('clamp', () => {
		assert.strictEqual(clamp(5, 1, 10), 5);
		assert.strictEqual(clamp(1, 1, 10), 1);
		assert.strictEqual(clamp(10, 1, 10), 10);
		assert.strictEqual(clamp(-7, 1, 10), 1);
		assert.strictEqual(clamp(42, 1, 10), 10);
		assert.strictEqual(clamp(1.5, 0, 1), 1);
		assert.strictEqual(clamp(-1.5, -1, 1), -1);
		// An inverted range resolves to `min`, because the upper bound is applied first.
		assert.strictEqual(clamp(5, 10, 1), 10);
	});

	it('round', () => {
		assert.strictEqual(round(0.5), 1);
		assert.strictEqual(round(2.5), 3);
		assert.strictEqual(round(-0.5), -1);
		assert.strictEqual(round(-1.5), -2);
		assert.strictEqual(round(1.4), 1);
		assert.strictEqual(round(-1.4), -1);
		assert.strictEqual(round(1.005, 2), 1.01);
		assert.strictEqual(round(2.675, 2), 2.68);
		assert.strictEqual(round(1234, -2), 1200);
		assert.strictEqual(round(4.006, 2), 4.01);
		assert.strictEqual(round(1.1, 1), 1.1);
		assert.strictEqual(round(0), 0);
		assert.strictEqual(round(-0.4), 0);
		assert.strictEqual(Number.isNaN(round(NaN)), true);
		assert.strictEqual(round(Infinity), Infinity);
	});

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
		assert.strictEqual(sum(0), 0);
		assert.strictEqual(sum(1, 2, 3, 4), 10);
		assert.strictEqual(sum([1, 2, 3]), 6);
		assert.strictEqual(sum(1234), 1234);
	});

	it('mul', () => {
		assert.strictEqual(mul(0), 0);
		assert.strictEqual(mul(1, 2, 3, 4), 24);
		assert.strictEqual(mul([1, 2, 3]), 6);
		assert.strictEqual(mul(1, 5, 7, 0, 9), 0);
		assert.strictEqual(mul(1234), 1234);
	});

	it('sub', () => {
		assert.strictEqual(sub(0), 0);
		assert.strictEqual(sub(100, 10, 20, 30), 40);
		assert.strictEqual(sub([10, 20, 30]), -40);
		assert.strictEqual(sub(1, 3, 5, -7, -9), 9);
		assert.strictEqual(sub(1234), 1234);
	});

	it('div', () => {
		assert.strictEqual(div(0), 0);
		assert.strictEqual(div(100, 2, 2, 5), 5);
		assert.strictEqual(div([10, 2, 5]), 1);
		assert.strictEqual(div(1234), 1234);
	});
});
