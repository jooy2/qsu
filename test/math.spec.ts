import assert from 'assert';
import { numRandom, sum, mul, sub, div } from '../dist';

describe('Math', () => {
	it('numRandom', (done) => {
		assert(typeof numRandom(1, 2) === 'number');
		for (let i = 0; i < 50; i += 1) {
			const offsetTest: number = numRandom(5, 10);
			assert(offsetTest >= 5 && offsetTest <= 10);
		}
		done();
	});

	it('sum', (done) => {
		assert.strictEqual(sum(1, 2, 3, 4), 10);
		assert.strictEqual(sum([1, 2, 3]), 6);
		assert.strictEqual(sum(1234), 1234);
		done();
	});

	it('mul', (done) => {
		assert.strictEqual(mul(1, 2, 3, 4), 24);
		assert.strictEqual(mul([1, 2, 3]), 6);
		assert.strictEqual(mul(1, 5, 7, 0, 9), 0);
		assert.strictEqual(mul(1234), 1234);
		done();
	});

	it('sub', (done) => {
		assert.strictEqual(sub(100, 10, 20, 30), 40);
		assert.strictEqual(sub([10, 20, 30]), -40);
		assert.strictEqual(sub(1, 3, 5, -7, -9), 9);
		assert.strictEqual(sub(1234), 1234);
		done();
	});

	it('div', (done) => {
		assert.strictEqual(div(100, 2, 2, 5), 5);
		assert.strictEqual(div([10, 2, 5]), 1);
		assert.strictEqual(div(1234), 1234);
		done();
	});
});
