import assert from 'assert';
import { describe, it } from 'node:test';
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
	arrGroupByMaxCount,
	funcTimes,
	arrPick,
	arrCompact,
	arrDifference,
	arrIntersection
} from '../dist';

describe('Array', () => {
	it('arrShuffle', () => {
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
	});

	it('arrWithDefault', () => {
		assert(arrWithDefault('test'));
		assert(arrWithDefault('test', 10));
		assert(arrWithDefault(100, 5));
	});

	it('arrUnique', () => {
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
	});

	it('arrWithNumber', () => {
		assert.deepStrictEqual(arrWithNumber(1, 2), [1, 2]);
		assert.throws(() => arrWithNumber(2, 1));
		assert.deepStrictEqual(arrWithNumber(0, 5), [0, 1, 2, 3, 4, 5]);
		assert.deepStrictEqual(arrWithNumber(1, 1), [1]);
	});

	it('average', () => {
		assert.deepStrictEqual(average([1, 3, 5, 7, 9]), 5);
		assert.deepStrictEqual(average([1, 5, 15, 50]), 17.75);
		assert.deepStrictEqual(average([5, -5]), 0);
	});

	it('arrMove', () => {
		assert.deepStrictEqual(arrMove([1, 3, 5, 7, 9], 0, 3), [3, 5, 7, 1, 9]);
		assert.deepStrictEqual(arrMove([5, 10, 15], 1, 2), [5, 15, 10]);
		assert.deepStrictEqual(arrMove([5, 10, 15], 1, 1), [5, 10, 15]);
	});

	it('arrPick', () => {
		assert.deepStrictEqual(arrPick([1]), 1);

		const pickResult = arrPick([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

		assert.deepStrictEqual(pickResult < 10, true);
		assert.deepStrictEqual(typeof pickResult === 'number', true);
		assert.deepStrictEqual(arrPick([]), null);
	});

	it('arrTo1dArray', () => {
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
	});

	it('arrRepeat', () => {
		assert.deepStrictEqual(arrRepeat([1, 2, 3, 4], 3), [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
		assert.deepStrictEqual(arrRepeat({ a: 1, b: 2 }, 5), [
			{ a: 1, b: 2 },
			{ a: 1, b: 2 },
			{ a: 1, b: 2 },
			{ a: 1, b: 2 },
			{ a: 1, b: 2 }
		]);
	});

	it('arrCount', () => {
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
	});

	it('sortByObjectKey', () => {
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
	});

	it('sortNumeric', () => {
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
	});

	it('arrGroupByMaxCount', () => {
		assert.deepStrictEqual(arrGroupByMaxCount([1, 2, 3], 1), [[1], [2], [3]]);
		assert.deepStrictEqual(arrGroupByMaxCount([1, 2, [], 4, [[]]], 2), [[1, 2], [[], 4], [[[]]]]);
		assert.deepStrictEqual(arrGroupByMaxCount([1, 2, 3, 4], 5), [[1, 2, 3, 4]]);
		assert.deepStrictEqual(arrGroupByMaxCount([1, 1, 1, 1, 1, 1], 2), [
			[1, 1],
			[1, 1],
			[1, 1]
		]);
	});

	it('arrCompact', () => {
		assert.deepStrictEqual(arrCompact([0, 1, false, 2, '', 3, null, undefined, NaN]), [1, 2, 3]);
		assert.deepStrictEqual(arrCompact([false, 0, '', null, undefined, NaN]), []);
		assert.deepStrictEqual(arrCompact([]), []);
		assert.deepStrictEqual(arrCompact(['a', 'b']), ['a', 'b']);
		// Empty containers and whitespace are not falsy and must survive.
		assert.deepStrictEqual(arrCompact([[], {}, ' ', '0']), [[], {}, ' ', '0']);
		assert.deepStrictEqual(arrCompact([-0, 0.0, 0]), []);
		assert.deepStrictEqual(arrCompact([true, -1, 0.5]), [true, -1, 0.5]);
		assert.deepStrictEqual(arrCompact(null as unknown as any[]), []);
	});

	it('arrDifference', () => {
		assert.deepStrictEqual(arrDifference([2, 1, 3], [2, 3]), [1]);
		// Duplicates of a kept value stay, and the original order is preserved.
		assert.deepStrictEqual(arrDifference([2, 1, 2, 3], [1]), [2, 2, 3]);
		assert.deepStrictEqual(arrDifference([1, 2, 3, 4], [2], [4]), [1, 3]);
		assert.deepStrictEqual(arrDifference([1, 2, 3]), [1, 2, 3]);
		assert.deepStrictEqual(arrDifference([1, 2, 3], []), [1, 2, 3]);
		assert.deepStrictEqual(arrDifference([], [1]), []);
		assert.deepStrictEqual(arrDifference(['a', 'b'], ['b']), ['a']);
		// Values are compared by value, so nested arrays and objects are matched too.
		assert.deepStrictEqual(arrDifference([[1], [2]], [[1]]), [[2]]);
		assert.deepStrictEqual(arrDifference([{ a: 1 }, { b: 2 }], [{ a: 1 }]), [{ b: 2 }]);
		// `1` and `'1'` are different values.
		assert.deepStrictEqual(arrDifference([1, '1'], [1]), ['1']);
		assert.deepStrictEqual(arrDifference([null, undefined, 0], [null]), [undefined, 0]);
		assert.deepStrictEqual(arrDifference([NaN, 1], [NaN]), [1]);
		assert.deepStrictEqual(arrDifference(null as unknown as any[], [1]), []);
	});

	it('arrIntersection', () => {
		assert.deepStrictEqual(arrIntersection([2, 1], [2, 3]), [2]);
		assert.deepStrictEqual(arrIntersection([1, 2, 3], [2, 3, 4], [3, 2]), [2, 3]);
		// The result is unique and keeps the order of the first array.
		assert.deepStrictEqual(arrIntersection([2, 1, 2], [2]), [2]);
		assert.deepStrictEqual(arrIntersection([3, 1, 2], [1, 2, 3]), [3, 1, 2]);
		assert.deepStrictEqual(arrIntersection([1, 2], [3]), []);
		assert.deepStrictEqual(arrIntersection([1, 1, 2]), [1, 2]);
		assert.deepStrictEqual(arrIntersection(), []);
		assert.deepStrictEqual(arrIntersection([], [1]), []);
		// Values are compared by value, so nested arrays and objects are matched too.
		assert.deepStrictEqual(arrIntersection([[1], [2]], [[2], [3]]), [[2]]);
		assert.deepStrictEqual(arrIntersection([{ a: 1 }, { b: 2 }], [{ b: 2 }]), [{ b: 2 }]);
		// `1` and `'1'` are different values.
		assert.deepStrictEqual(arrIntersection([1, '1'], ['1']), ['1']);
		assert.deepStrictEqual(arrIntersection([NaN, 1], [NaN]), [NaN]);
	});
});
