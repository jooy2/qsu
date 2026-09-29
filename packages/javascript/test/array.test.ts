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
	arrIntersection,
	arrGroupBy,
	median
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

	it('arrUnique compares by value', () => {
		const first = { a: 1 };
		const result = arrUnique([first, { a: 1 }, { a: 2 }]);

		// Objects with the same contents are duplicates, and the first one is kept as it is.
		assert.deepStrictEqual(result, [{ a: 1 }, { a: 2 }]);
		assert.strictEqual(result[0], first);

		const nested = [1];

		assert.deepStrictEqual(arrUnique([nested, [1], 1]), [[1], 1]);
		assert.strictEqual(arrUnique([nested, [1]])[0], nested);
		// No type coercion, and `1.0` is the number `1`.
		assert.deepStrictEqual(arrUnique([1, 1.0, true, '1']), [1, true, '1']);
		assert.strictEqual(arrUnique([NaN, NaN]).length, 1);
	});

	it('arrWithNumber', () => {
		assert.deepStrictEqual(arrWithNumber(1, 2), [1, 2]);
		assert.throws(() => arrWithNumber(2, 1));
		assert.deepStrictEqual(arrWithNumber(0, 5), [0, 1, 2, 3, 4, 5]);
		assert.deepStrictEqual(arrWithNumber(1, 1), [1]);
		assert.deepStrictEqual(arrWithNumber(1, 5), [1, 2, 3, 4, 5]);
		assert.deepStrictEqual(arrWithNumber(3, 3), [3]);
		// The end is included only when a step lands on it.
		assert.deepStrictEqual(arrWithNumber(0, 10, { step: 3 }), [0, 3, 6, 9]);
		assert.deepStrictEqual(arrWithNumber(0, 10, { step: 5 }), [0, 5, 10]);
		assert.deepStrictEqual(arrWithNumber(1, 2, { step: 10 }), [1]);
		assert.deepStrictEqual(arrWithNumber(-5, 5, { step: 5 }), [-5, 0, 5]);
		assert.throws(() => arrWithNumber(5, 1), {
			name: 'RangeError',
			message: '`start` is greater than `end`.'
		});

		const stepError = { name: 'RangeError', message: '`step` must be a positive integer.' };

		assert.throws(() => arrWithNumber(0, 10, { step: 0 }), stepError);
		assert.throws(() => arrWithNumber(0, 10, { step: -1 }), stepError);
		assert.throws(() => arrWithNumber(0, 10, { step: 1.5 }), stepError);
	});

	it('average', () => {
		assert.deepStrictEqual(average([1, 3, 5, 7, 9]), 5);
		assert.deepStrictEqual(average([1, 5, 15, 50]), 17.75);
		assert.deepStrictEqual(average([5, -5]), 0);
		// An empty array has no average.
		assert.ok(Number.isNaN(average([])));
	});

	it('median', () => {
		assert.strictEqual(median([3, 1, 2]), 2);
		assert.strictEqual(median([4, 1, 3, 2]), 2.5);
		assert.strictEqual(median([5]), 5);
		assert.strictEqual(median([1, 3]), 2);
		assert.strictEqual(median([-1, -5, 0]), -1);
		assert.strictEqual(median([1.5, 2.5]), 2);
		// `NaN` is skipped, as `min` and `max` skip it.
		assert.strictEqual(median([NaN, 1, 3]), 2);
		assert.strictEqual(median([]), null);
		assert.strictEqual(median([NaN]), null);

		// The input keeps its order.
		const input = [3, 1, 2];

		median(input);
		assert.deepStrictEqual(input, [3, 1, 2]);
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

	it('arrCount keeps inherited names as values', () => {
		const counted = arrCount(['__proto__', '__proto__', 'a']);

		// Counted as data rather than written over the prototype of the result.
		assert.strictEqual(Object.hasOwn(counted, '__proto__'), true);
		assert.strictEqual(Object.getPrototypeOf(counted), Object.prototype);
		assert.deepStrictEqual(Object.entries(counted), [
			['__proto__', 2],
			['a', 1]
		]);
		// `constructor` is inherited, so it must not read as a count the array already had.
		assert.deepStrictEqual(arrCount(['constructor']), { constructor: 1 });
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

	// The ordering below has to be identical in the Dart and Python packages. It used to
	// come from `Intl.Collator` here, which answered differently depending on the locale
	// of the machine, and neither of the other two packages matched it.
	it('sortNumeric (ordering is the same in every package)', () => {
		// Case is a tie-break, not the first thing compared, so the numbers still decide.
		assert.deepStrictEqual(sortNumeric(['item2', 'Item10', 'item1']), ['item1', 'item2', 'Item10']);
		assert.deepStrictEqual(sortNumeric(['file-1.txt', 'File-3.txt', 'file-10.txt', 'file-2.txt']), [
			'file-1.txt',
			'file-2.txt',
			'File-3.txt',
			'file-10.txt'
		]);
		// Lower case comes before upper case when nothing else separates them.
		assert.deepStrictEqual(sortNumeric(['Apple', 'apple', 'Banana', 'banana']), [
			'apple',
			'Apple',
			'banana',
			'Banana'
		]);
		assert.deepStrictEqual(sortNumeric(['a', 'A', 'b', 'B']), ['a', 'A', 'b', 'B']);
		// An accent is a tie-break too, so `äpple` sits next to `apple` and not after `z`.
		assert.deepStrictEqual(sortNumeric(['zebra', 'äpple', 'apple', 'Zebra']), [
			'apple',
			'äpple',
			'zebra',
			'Zebra'
		]);
		assert.deepStrictEqual(sortNumeric(['résumé', 'resume', 'Resume']), [
			'resume',
			'Resume',
			'résumé'
		]);
		// Whitespace, then punctuation, then digits, then letters.
		assert.deepStrictEqual(sortNumeric(['1file', '.gitignore', 'apple', '_private']), [
			'.gitignore',
			'_private',
			'1file',
			'apple'
		]);
		// A run of digits is compared by length first, so it stays exact past
		// `Number.MAX_SAFE_INTEGER`.
		assert.deepStrictEqual(sortNumeric(['12345678901234567891', '12345678901234567890', '2']), [
			'2',
			'12345678901234567890',
			'12345678901234567891'
		]);
		// Leading zeros do not change the value, so the raw string breaks the tie.
		assert.deepStrictEqual(sortNumeric(['007', '7', '08', '8']), ['007', '7', '08', '8']);
		assert.deepStrictEqual(sortNumeric(['b', 'a', 'c'], true), ['c', 'b', 'a']);
	});

	it('sortByObjectKey (numerically uses the same ordering)', () => {
		const rows = [{ n: 'item2' }, { n: 'Item10' }, { n: 'item1' }];

		assert.deepStrictEqual(sortByObjectKey(rows, 'n', false, true), [
			{ n: 'item1' },
			{ n: 'item2' },
			{ n: 'Item10' }
		]);
		assert.deepStrictEqual(sortByObjectKey(rows, 'n', true, true), [
			{ n: 'Item10' },
			{ n: 'item2' },
			{ n: 'item1' }
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

	it('arrGroupBy', () => {
		assert.deepStrictEqual(arrGroupBy([1.2, 1.8, 2.1], Math.floor), {
			'1': [1.2, 1.8],
			'2': [2.1]
		});
		assert.deepStrictEqual(
			arrGroupBy(['one', 'two', 'three'], (item) => item.length),
			{ '3': ['one', 'two'], '5': ['three'] }
		);

		// The grouped items are the input's own, not copies.
		const first = { type: 'a', v: 1 };
		const second = { type: 'b', v: 2 };
		const third = { type: 'a', v: 3 };
		const byType = arrGroupBy([first, second, third], (item) => item.type);

		assert.deepStrictEqual(byType, { a: [first, third], b: [second] });
		assert.strictEqual(byType.a[0], first);
		assert.strictEqual(byType.a[1], third);
		assert.strictEqual(byType.b[0], second);

		// A key is the callback's result written as a string.
		assert.deepStrictEqual(
			arrGroupBy(['x'], () => 1.0),
			{ '1': ['x'] }
		);
		assert.deepStrictEqual(
			arrGroupBy(['x'], () => true as any),
			{ true: ['x'] }
		);
		assert.deepStrictEqual(
			arrGroupBy(['x'], () => null as any),
			{ null: ['x'] }
		);

		// Groups keep the order their key was first seen in.
		assert.deepStrictEqual(Object.keys(arrGroupBy(['b', 'a', 'b'], (item) => item)), ['b', 'a']);
		assert.deepStrictEqual(
			arrGroupBy(['b', 'a', 'b'], (item) => item),
			{ b: ['b', 'b'], a: ['a'] }
		);

		assert.deepStrictEqual(
			arrGroupBy([], (item) => item),
			{}
		);
		assert.deepStrictEqual(
			arrGroupBy(null as any, (item: any) => item),
			{}
		);
		assert.deepStrictEqual(
			arrGroupBy('abc' as any, (item: any) => item),
			{}
		);

		// The callback receives the item and nothing else.
		const calls: any[][] = [];

		arrGroupBy([1, 2], (...args: any[]) => {
			calls.push(args);

			return 1;
		});
		assert.deepStrictEqual(calls, [[1], [2]]);

		// A key named `__proto__` is a group, not the prototype of the result.
		const protoGroups = arrGroupBy(['__proto__'], (item) => item);

		assert.strictEqual(Object.hasOwn(protoGroups, '__proto__'), true);
		assert.strictEqual(Object.getPrototypeOf(protoGroups), Object.prototype);

		// The input is not modified.
		const input = [3, 1, 2];

		arrGroupBy(input, (item) => item % 2);
		assert.deepStrictEqual(input, [3, 1, 2]);
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
