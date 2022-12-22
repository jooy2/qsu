import assert from 'assert';
import {
	arrShuffle,
	arrWithDefault,
	arrUnique,
	arrWithNumber,
	average,
	arrMove,
	arrTo1dArray,
	arrRepeat
} from '../dist';

describe('Array', () => {
	it('arrShuffle', (done) => {
		assert(arrShuffle([1, 2, 3, 4, 5, 6, 7, 8]));
		assert(
			arrShuffle([
				[1, 2],
				[3, 4],
				[5, 6],
				[7, 8]
			])
		);
		assert(arrShuffle([{ A: 1 }, { B: 2 }, { C: 3 }, { D: 4 }]));
		done();
	});

	it('arrWithDefault', (done) => {
		assert(arrWithDefault('test'));
		assert(arrWithDefault('test', 10));
		assert(arrWithDefault(100, 5));
		done();
	});

	it('arrUnique', (done) => {
		assert.deepStrictEqual(arrUnique([1, 1, 2, 2, 2, 2, 3]), [1, 2, 3]);
		assert.deepStrictEqual(arrUnique(['1', '2', '3', '3', '4']), ['1', '2', '3', '4']);
		assert.deepStrictEqual(arrUnique([1, '1', 1, 'a', 2, 'b']), [1, '1', 'a', 2, 'b']);
		assert.deepStrictEqual(
			arrUnique([
				[1, 2],
				[1, 2],
				[2, 3],
				[2, 3],
				[2, 3],
				[2, 4]
			]),
			[
				[1, 2],
				[2, 3],
				[2, 4]
			]
		);
		done();
	});

	it('arrWithNumber', (done) => {
		assert.deepStrictEqual(arrWithNumber(1, 2), [1, 2]);
		assert.throws(() => arrWithNumber(2, 1));
		assert.deepStrictEqual(arrWithNumber(0, 5), [0, 1, 2, 3, 4, 5]);
		assert.deepStrictEqual(arrWithNumber(1, 1), [1]);
		done();
	});

	it('average', (done) => {
		assert.deepStrictEqual(average([1, 3, 5, 7, 9]), 5);
		assert.deepStrictEqual(average([1, 5, 15, 50]), 17.75);
		assert.deepStrictEqual(average([5, -5]), 0);
		done();
	});

	it('arrMove', (done) => {
		assert.deepStrictEqual(arrMove([1, 3, 5, 7, 9], 0, 3), [3, 5, 7, 1, 9]);
		assert.deepStrictEqual(arrMove([5, 10, 15], 1, 2), [5, 15, 10]);
		assert.deepStrictEqual(arrMove([5, 10, 15], 1, 1), [5, 10, 15]);
		done();
	});

	it('arrTo1dArray', (done) => {
		assert.deepStrictEqual(
			arrTo1dArray([
				[1, 2, 3, 4],
				[5, 6, 7, 8]
			]),
			[1, 2, 3, 4, 5, 6, 7, 8]
		);
		assert.deepStrictEqual(arrTo1dArray([[1, 2, 3], 4, 5, [6, 7, 8]]), [1, 2, 3, 4, 5, 6, 7, 8]);
		assert.deepStrictEqual(
			arrTo1dArray([
				[1, 2],
				[
					[3, 4],
					[5, 6]
				],
				7,
				[8]
			]),
			[1, 2, 3, 4, 5, 6, 7, 8]
		);
		assert.deepStrictEqual(arrTo1dArray([[[[1, 2, 3, 4, 5, 6]]], 7, 8]), [1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	it('arrRepeat', (done) => {
		assert.deepStrictEqual(arrRepeat([1, 2, 3, 4], 3), [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
		assert.deepStrictEqual(arrRepeat({ a: 1, b: 2 }, 5), [
			{ a: 1, b: 2 },
			{ a: 1, b: 2 },
			{ a: 1, b: 2 },
			{ a: 1, b: 2 },
			{ a: 1, b: 2 }
		]);
		done();
	});
});
