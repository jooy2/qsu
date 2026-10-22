import assert from 'assert';
import { describe, it } from 'node:test';
import {
	numRandom,
	numUniqueId,
	numSum,
	mul,
	sub,
	div,
	clamp,
	numRound,
	ceil,
	floor,
	numMax,
	numMin
} from '../dist';

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

	it('ceil', () => {
		assert.strictEqual(ceil(4.006), 5);
		assert.strictEqual(ceil(4), 4);
		assert.strictEqual(ceil(-4.006), -4);
		assert.strictEqual(ceil(6.004, 2), 6.01);
		assert.strictEqual(ceil(6040, -2), 6100);
		assert.strictEqual(ceil(1.1, 1), 1.1);
		assert.strictEqual(ceil(-0.5), 0);
		assert.strictEqual(ceil(0), 0);
		assert.strictEqual(Number.isNaN(ceil(NaN)), true);
		assert.strictEqual(ceil(Infinity), Infinity);
	});

	it('floor', () => {
		assert.strictEqual(floor(4.006), 4);
		assert.strictEqual(floor(4), 4);
		assert.strictEqual(floor(-4.006), -5);
		assert.strictEqual(floor(0.046, 2), 0.04);
		assert.strictEqual(floor(4060, -2), 4000);
		assert.strictEqual(floor(1.1, 1), 1.1);
		assert.strictEqual(floor(-0.5), -1);
		assert.strictEqual(floor(0), 0);
		assert.strictEqual(Number.isNaN(floor(NaN)), true);
		assert.strictEqual(floor(-Infinity), -Infinity);
	});

	it('numRound', () => {
		assert.strictEqual(numRound(0.5), 1);
		assert.strictEqual(numRound(2.5), 3);
		assert.strictEqual(numRound(-0.5), -1);
		assert.strictEqual(numRound(-1.5), -2);
		assert.strictEqual(numRound(1.4), 1);
		assert.strictEqual(numRound(-1.4), -1);
		assert.strictEqual(numRound(1.005, 2), 1.01);
		assert.strictEqual(numRound(2.675, 2), 2.68);
		assert.strictEqual(numRound(1234, -2), 1200);
		assert.strictEqual(numRound(4.006, 2), 4.01);
		assert.strictEqual(numRound(1.1, 1), 1.1);
		assert.strictEqual(numRound(0), 0);
		assert.strictEqual(numRound(-0.4), 0);
		assert.strictEqual(Number.isNaN(numRound(NaN)), true);
		assert.strictEqual(numRound(Infinity), Infinity);
	});

	it('numMax', () => {
		assert.strictEqual(numMax(1, 2, 3), 3);
		assert.strictEqual(numMax([4, 2, 8, 6]), 8);
		assert.strictEqual(numMax(-4, -2, -8), -2);
		assert.strictEqual(numMax(1.5, 1.25), 1.5);
		assert.strictEqual(numMax(7), 7);
		assert.strictEqual(numMax([]), null);
		assert.strictEqual(numMax(), null);
		assert.strictEqual(numMax([NaN, 5]), 5);
		assert.strictEqual(numMax(['a', 3, null] as any), 3);
	});

	it('numRandom', () => {
		assert.strictEqual(typeof numRandom(1, 60) === 'number', true);
		for (let i = 0; i < 50; i += 1) {
			const offsetTest: number = numRandom(5, 10);
			assert(offsetTest >= 5 && offsetTest <= 10);
		}
	});

	it('numUniqueId', () => {
		assert.strictEqual(typeof numUniqueId() === 'number', true);

		const uniqSets = new Set();

		for (let i = 0; i < 100; i += 1) {
			const uniq = numUniqueId();

			if (uniqSets.has(uniq)) {
				throw new Error('Duplicate number generated');
			} else {
				uniqSets.add(uniq);
			}
		}
	});

	it('numSum', () => {
		assert.strictEqual(numSum(0), 0);
		assert.strictEqual(numSum(1, 2, 3, 4), 10);
		assert.strictEqual(numSum([1, 2, 3]), 6);
		assert.strictEqual(numSum(1234), 1234);
	});

	it('numMin', () => {
		assert.strictEqual(numMin(1, 2, 3), 1);
		assert.strictEqual(numMin([4, 2, 8, 6]), 2);
		assert.strictEqual(numMin(-4, -2, -8), -8);
		assert.strictEqual(numMin(1.5, 1.25), 1.25);
		assert.strictEqual(numMin(7), 7);
		assert.strictEqual(numMin([]), null);
		assert.strictEqual(numMin(), null);
		assert.strictEqual(numMin([NaN, 5]), 5);
		assert.strictEqual(numMin(['a', 3, null] as any), 3);
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
