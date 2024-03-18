import assert from 'assert';
import {
	arrShuffle,
	arrWithDefault,
	arrUnique,
	arrWithNumber,
	average,
	arrMove,
	arrTo1dArray,
	arrRepeat,
	arrCount,
	sortByObjectKey,
	sortNumeric,
	arrGroupByMaxCount
} from '../dist';
import { funcTimes } from '../lib';

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
		const big2dArray = [
			[10, 20, 30, 40, 50],
			[1, 2, 3, 4, 5],
			[6, 7, 8, 9, 0]
		];
		funcTimes(150000, () => big2dArray.push([1, 1, 1, 1, 1]));
		funcTimes(150000, () => big2dArray.push([2, 2, 2, 2, 2]));
		funcTimes(150000, () => big2dArray.push([3, 3, 3, 3, 3]));

		assert.deepStrictEqual(arrUnique(big2dArray), [
			[10, 20, 30, 40, 50],
			[1, 2, 3, 4, 5],
			[6, 7, 8, 9, 0],
			[1, 1, 1, 1, 1],
			[2, 2, 2, 2, 2],
			[3, 3, 3, 3, 3]
		]);
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

	it('arrCount', (done) => {
		assert.deepStrictEqual(arrCount([]), {});
		assert.deepStrictEqual(arrCount([1, 2, 3, 3, 4, 5, 5, 5]), {
			'1': 1,
			'2': 1,
			'3': 2,
			'4': 1,
			'5': 3
		});
		assert.deepStrictEqual(arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']), {
			a: 4,
			b: 2,
			c: 1,
			d: 1
		});
		done();
	});

	it('sortByObjectKey', (done) => {
		const obj = [
			{
				aa: 1,
				bb: 'aaa',
				cc: 'hi1'
			},
			{
				aa: 4,
				bb: 'ccc',
				cc: 'hi10'
			},
			{
				aa: 2,
				bb: 'ddd',
				cc: 'hi2'
			},
			{
				aa: 3,
				bb: 'bbb',
				cc: 'hi11'
			}
		];

		assert.deepStrictEqual(sortByObjectKey(obj, 'aa'), [
			{
				aa: 1,
				bb: 'aaa',
				cc: 'hi1'
			},
			{
				aa: 2,
				bb: 'ddd',
				cc: 'hi2'
			},
			{
				aa: 3,
				bb: 'bbb',
				cc: 'hi11'
			},
			{
				aa: 4,
				bb: 'ccc',
				cc: 'hi10'
			}
		]);
		assert.deepStrictEqual(sortByObjectKey(obj, 'bb', true), [
			{
				aa: 2,
				bb: 'ddd',
				cc: 'hi2'
			},
			{
				aa: 4,
				bb: 'ccc',
				cc: 'hi10'
			},
			{
				aa: 3,
				bb: 'bbb',
				cc: 'hi11'
			},
			{
				aa: 1,
				bb: 'aaa',
				cc: 'hi1'
			}
		]);
		assert.deepStrictEqual(sortByObjectKey(obj, 'cc', false, true), [
			{
				aa: 1,
				bb: 'aaa',
				cc: 'hi1'
			},
			{
				aa: 2,
				bb: 'ddd',
				cc: 'hi2'
			},
			{
				aa: 4,
				bb: 'ccc',
				cc: 'hi10'
			},
			{
				aa: 3,
				bb: 'bbb',
				cc: 'hi11'
			}
		]);
		done();
	});

	it('sortNumeric', (done) => {
		assert.deepStrictEqual(sortNumeric([]), []);
		assert.deepStrictEqual(sortNumeric(['a', 'd', 'c', 'b']), ['a', 'b', 'c', 'd']);
		assert.deepStrictEqual(sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']), [
			'1',
			'1a',
			'a1a',
			'a2a',
			'a3a',
			'a11a',
			'aa1a',
			'b2a'
		]);
		assert.deepStrictEqual(sortNumeric(['3', '1', '11', '100', '10', '2', '15']), [
			'1',
			'2',
			'3',
			'10',
			'11',
			'15',
			'100'
		]);
		done();
	});

	it('arrGroupByMaxCount', (done) => {
		assert.deepStrictEqual(arrGroupByMaxCount([1, 2, 3], 1), [[1], [2], [3]]);
		assert.deepStrictEqual(arrGroupByMaxCount([1, 2, [], 4, [[]]], 2), [[1, 2], [[], 4], [[[]]]]);
		assert.deepStrictEqual(arrGroupByMaxCount([1, 2, 3, 4], 5), [[1, 2, 3, 4]]);
		assert.deepStrictEqual(arrGroupByMaxCount([1, 1, 1, 1, 1, 1], 2), [
			[1, 1],
			[1, 1],
			[1, 1]
		]);
		done();
	});
});
