import assert from 'assert';
import { describe, it } from 'node:test';
import {
	objTo1d,
	objToQueryString,
	objToPrettyStr,
	objFindItemRecursiveByKey,
	objToArray,
	objDeleteKeyByValue,
	objUpdate,
	objMergeNewKey,
	objPickBy,
	objMapKeys,
	objInvert,
	objPick,
	objGet,
	objMerge,
	objClone
} from '../dist';

describe('Misc', () => {
	it('funcTimes', () => {
		assert.deepStrictEqual(objToQueryString({}), '');
		assert.deepStrictEqual(
			objToQueryString({
				hello: 'world',
				test: 1234,
				arr: [1, 2, 3]
			}),
			'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
		);
		assert.deepStrictEqual(
			objToQueryString({
				a: '=',
				b: '&',
				c: '%'
			}),
			'a=%3D&b=%26&c=%25'
		);
		assert.deepStrictEqual(
			objToQueryString({
				a: '가나다'
			}),
			'a=%EA%B0%80%EB%82%98%EB%8B%A4'
		);
	});

	it('objToPrettyStr', () => {
		assert.deepStrictEqual(objToPrettyStr({}), '{}');
		assert.deepStrictEqual(
			objToPrettyStr({ a: 1, b: { c: 1, d: 2 } }),
			'{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
		);
	});

	it('objFindItemRecursiveByKey', () => {
		assert.deepStrictEqual(
			objFindItemRecursiveByKey(
				{
					a: 1,
					b: 2,
					c: 3
				},
				'a',
				123,
				'child'
			),
			null
		);
		assert.deepStrictEqual(
			objFindItemRecursiveByKey(
				[
					{
						a: 1,
						b: 2,
						c: 3
					},
					{
						a: 2,
						b: 3,
						c: 4
					},
					{
						a: 3,
						b: 4,
						c: 5
					},
					{
						a: 4,
						b: 5,
						c: 6
					}
				],
				'a',
				3,
				'a'
			),
			{
				a: 3,
				b: 4,
				c: 5
			}
		);
		assert.deepStrictEqual(
			objFindItemRecursiveByKey(
				{
					a: {
						a: {
							a: 123
						}
					},
					b: {
						a: {}
					},
					c: 3
				},
				'a',
				123,
				'a'
			),
			{
				a: 123
			}
		);
		assert.deepStrictEqual(
			objFindItemRecursiveByKey(
				{
					id: 123,
					child: [
						{
							id: 456
						},
						{
							id: 789
						}
					]
				},
				'id',
				456,
				'child'
			),
			{
				id: 456
			}
		);
	});

	it('objToArray', () => {
		assert.deepStrictEqual(objToArray({}), []);
		assert.deepStrictEqual(
			objToArray({
				a: 1,
				b: 2,
				c: 3
			}),
			[
				['a', 1],
				['b', 2],
				['c', 3]
			]
		);
		assert.deepStrictEqual(
			objToArray(
				{
					a: 1,
					b: {
						aa: 1,
						bb: 2,
						cc: {
							aaa: 1
						}
					},
					c: 3
				},
				true
			),
			[
				['a', 1],
				[
					'b',
					[
						['aa', 1],
						['bb', 2],
						['cc', [['aaa', 1]]]
					]
				],
				['c', 3]
			]
		);
		assert.deepStrictEqual(
			objToArray({
				a: 1.234,
				b: 'str',
				c: [1, 2, 3],
				d: { a: 1 }
			}),
			[
				['a', 1.234],
				['b', 'str'],
				['c', [1, 2, 3]],
				['d', { a: 1 }]
			]
		);
	});

	it('objTo1d', () => {
		assert.deepStrictEqual(objTo1d({}), {});
		assert.deepStrictEqual(
			objTo1d({
				a: 1,
				b: 2,
				c: 3
			}),
			{
				a: 1,
				b: 2,
				c: 3
			}
		);
		assert.deepStrictEqual(
			objTo1d({
				a: 1,
				b: {
					aa: 1,
					bb: 2
				},
				c: 3
			}),
			{
				a: 1,
				'b.aa': 1,
				'b.bb': 2,
				c: 3
			}
		);
		assert.deepStrictEqual(
			objTo1d(
				{
					a: 1,
					b: {
						aa: 1,
						bb: 2
					},
					c: 3
				},
				'='
			),
			{
				a: 1,
				'b=aa': 1,
				'b=bb': 2,
				c: 3
			}
		);
		assert.deepStrictEqual(
			objTo1d({
				a: 1,
				b: {
					aa: {
						aaa: {
							aaaa: 1,
							bbbb: null
						}
					},
					bb: 2
				},
				c: 3
			}),
			{
				a: 1,
				'b.aa.aaa.aaaa': 1,
				'b.aa.aaa.bbbb': null,
				'b.bb': 2,
				c: 3
			}
		);
	});

	it('objDeleteKeyByValue', () => {
		assert.deepStrictEqual(objDeleteKeyByValue({}, 1), {});
		assert.deepStrictEqual(
			objDeleteKeyByValue(
				{
					a: 1,
					b: 2,
					c: 2,
					d: 3,
					e: 2,
					f: '2'
				},
				2
			),
			{
				a: 1,
				d: 3,
				f: '2'
			}
		);
		assert.deepStrictEqual(
			objDeleteKeyByValue(
				{
					a: 1,
					b: 2,
					c: {
						aa: 2,
						bb: {
							aaa: 1,
							bbb: 2,
							ccc: 2
						}
					},
					d: 3,
					e: {
						aa: 2
					}
				},
				2,
				true
			),
			{
				a: 1,
				c: {
					bb: {
						aaa: 1
					}
				},
				d: 3,
				e: {}
			}
		);
		assert.deepStrictEqual(
			objDeleteKeyByValue(
				{
					a: 1,
					b: 2,
					c: {
						aa: 2,
						bb: {
							aaa: 1,
							bbb: 2,
							ccc: 2
						}
					},
					d: 2,
					e: {
						aa: 2
					}
				},
				2
			),
			{
				a: 1,
				c: {
					aa: 2,
					bb: {
						aaa: 1,
						bbb: 2,
						ccc: 2
					}
				},
				e: {
					aa: 2
				}
			}
		);
	});

	it('objUpdate', () => {
		assert.deepStrictEqual(objUpdate({}, 'a', 'test'), {});
		assert.deepStrictEqual(objUpdate({}, 'a', 'test', false, true), { a: 'test' });
		assert.deepStrictEqual(objUpdate({ a: 1, b: 2, c: 3 }, 'c', 5), { a: 1, b: 2, c: 5 });
		assert.deepStrictEqual(
			objUpdate(
				{ a: { a: 1, b: 1, c: 1 }, b: 2, c: 3, d: { a: { a: 0, b: 0, c: 1 }, b: 4, c: 6 } },
				'c',
				0,
				true,
				true
			),
			{ a: { a: 1, b: 1, c: 0 }, b: 2, c: 0, d: { a: { a: 0, b: 0, c: 0 }, b: 4, c: 0 } }
		);
		assert.deepStrictEqual(
			objUpdate({ a: 1, b: { aa: 1, bb: { aaa: 1, bbb: 2 } }, c: 1 }, 'bbb', 3, true),
			{ a: 1, b: { aa: 1, bb: { aaa: 1, bbb: 3 } }, c: 1 }
		);
		assert.deepStrictEqual(objUpdate({ a: 1, b: { a: 1, b: 2 }, c: 3 }, 'd', '1', true, true), {
			a: 1,
			b: { a: 1, b: 2 },
			c: 3,
			d: '1'
		});
	});

	it('objMergeNewKey', () => {
		assert.deepStrictEqual(objMergeNewKey({ a: 1 }, {}), { a: 1 });
		assert.deepStrictEqual(objMergeNewKey({ a: 1 }, { a: 2 }), { a: 2 });
		assert.deepStrictEqual(objMergeNewKey({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
		assert.deepStrictEqual(objMergeNewKey({ a: 1, c: 3 }, { b: 2, d: '4' }), {
			a: 1,
			b: 2,
			c: 3,
			d: '4'
		});
		assert.deepStrictEqual(objMergeNewKey({ a: 1, c: 3 }, { b: [1, 2], d: null }), {
			a: 1,
			b: [1, 2],
			c: 3,
			d: null
		});
		assert.deepStrictEqual(
			objMergeNewKey({ a: { aa: 1 }, b: 2 }, { a: { bb: 2, cc: 3 }, c: { dd: 1 } }),
			{
				a: { aa: 1, bb: 2, cc: 3 },
				b: 2,
				c: { dd: 1 }
			}
		);
		assert.deepStrictEqual(
			objMergeNewKey(
				{
					a: 1,
					b: {
						ba: 1,
						bb: [1, 2]
					}
				},
				{
					b: {
						bb: [3],
						bc: 3
					},
					c: 1
				}
			),
			{
				a: 1,
				b: {
					ba: 1,
					bb: [1, 2],
					bc: 3
				},
				c: 1
			}
		);
		assert.deepStrictEqual(
			objMergeNewKey(
				{
					a: 1,
					b: {
						ba: 1,
						bb: [1, 2, 3, 4]
					}
				},
				{
					b: {
						bb: [5, 6, 7],
						bc: 3
					},
					c: 1
				},
				{ arrayAction: 'append' }
			),
			{
				a: 1,
				b: {
					ba: 1,
					bb: [1, 2, 3, 4, 5, 6, 7],
					bc: 3
				},
				c: 1
			}
		);
		assert.deepStrictEqual(
			objMergeNewKey(
				{
					a: 1,
					b: {
						ba: 1,
						bb: [1, 2, 3, 4]
					}
				},
				{
					b: {
						bb: [5, 6, 7],
						bc: 3
					},
					c: 1
				},
				{ arrayAction: 'replace' }
			),
			{
				a: 1,
				b: {
					ba: 1,
					bb: [5, 6, 7],
					bc: 3
				},
				c: 1
			}
		);
		assert.deepStrictEqual(
			objMergeNewKey(
				{
					a: 1,
					b: {
						ba: 1,
						bb: [1, 2, 3, 4]
					}
				},
				{
					b: {
						bb: [5, 6, 7],
						bc: 3
					},
					c: 1
				},
				{ arrayAction: 'original' }
			),
			{
				a: 1,
				b: {
					ba: 1,
					bb: [1, 2, 3, 4],
					bc: 3
				},
				c: 1
			}
		);
		assert.deepStrictEqual(
			objMergeNewKey(
				{
					a: 1,
					b: {
						ba: 1,
						bb: [
							[1, 2],
							[3, 4]
						]
					}
				},
				{
					b: {
						bb: [
							[5, 6],
							[7, 8]
						],
						bc: 3
					},
					c: 1
				}
			),
			{
				a: 1,
				b: {
					ba: 1,
					bb: [
						[1, 2],
						[3, 4]
					],
					bc: 3
				},
				c: 1
			}
		);
		assert.deepStrictEqual(
			objMergeNewKey(
				{
					a: [
						{ aa: 1, bb: 2, cc: null },
						{ aa: 4, bb: 5, cc: null }
					]
				},
				{
					a: [{ cc: 3 }, { cc: 6 }]
				}
			),
			{
				a: [
					{ aa: 1, bb: 2, cc: 3 },
					{ aa: 4, bb: 5, cc: 6 }
				]
			}
		);
		assert.deepStrictEqual(
			objMergeNewKey(
				{
					a: [
						{ aa: 1, bb: 2 },
						{ aa: 4, bb: 5 }
					]
				},
				{
					a: [{ cc: 3 }, { cc: 6 }]
				}
			),
			{
				a: [
					{ aa: 1, bb: 2, cc: 3 },
					{ aa: 4, bb: 5, cc: 6 }
				]
			}
		);
	});

	it('objClone', () => {
		const source = { a: 1, b: { c: [1, 2, { d: 3 }] } };
		const deep = objClone(source);

		assert.deepStrictEqual(deep, source);
		assert.notStrictEqual(deep.b, source.b);
		assert.notStrictEqual(deep.b.c, source.b.c);
		deep.b.c[2].d = 99;
		assert.strictEqual(source.b.c[2].d, 3);

		// `deep: false` copies the top level only, so the nested value is shared.
		const shallow = objClone(source, { deep: false });

		assert.notStrictEqual(shallow, source);
		assert.strictEqual(shallow.b, source.b);

		// Arrays are cloned as arrays.
		const list = objClone([1, [2, 3]]);

		assert.deepStrictEqual(list, [1, [2, 3]]);
		assert.strictEqual(Array.isArray(list), true);

		// `Date` and `RegExp` get a fresh copy.
		const date = new Date(0);
		const clonedDate = objClone({ date }).date;

		assert.notStrictEqual(clonedDate, date);
		assert.strictEqual(clonedDate.getTime(), 0);
		assert.strictEqual(objClone({ re: /ab+c/gi }).re.source, 'ab+c');

		// A structure that points back at itself is rebuilt with the same shape.
		const cyclic: any = { name: 'root' };

		cyclic.self = cyclic;

		const clonedCyclic = objClone(cyclic);

		assert.strictEqual(clonedCyclic.self, clonedCyclic);
		assert.notStrictEqual(clonedCyclic, cyclic);

		// Primitives are handed back as they are.
		assert.strictEqual(objClone(5), 5);
		assert.strictEqual(objClone(null), null);
		assert.strictEqual(objClone('abc'), 'abc');
	});

	it('objMerge', () => {
		assert.deepStrictEqual(objMerge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
		// The later source wins.
		assert.deepStrictEqual(objMerge({ a: 1 }, { a: 2 }, { a: 3 }), { a: 3 });
		// Nested objects are merged rather than replaced.
		assert.deepStrictEqual(objMerge({ a: { b: 1, c: 2 } }, { a: { c: 9, d: 3 } }), {
			a: { b: 1, c: 9, d: 3 }
		});
		// Arrays are replaced whole, not merged index by index.
		assert.deepStrictEqual(objMerge({ a: [1, 2, 3] }, { a: [9] }), { a: [9] });
		// A `null` replaces the object that was there.
		assert.deepStrictEqual(objMerge({ a: { b: 1 } }, { a: null }), { a: null });
		assert.deepStrictEqual(objMerge({ a: 1 }), { a: 1 });
		assert.deepStrictEqual(objMerge({}, {}), {});
		assert.strictEqual(objMerge(), null);
		assert.strictEqual(objMerge({ a: 1 }, null as any), null);
		assert.strictEqual(objMerge([1, 2] as any), null);

		// Neither source is modified, and the merged branch is a new object.
		const first = { a: { b: 1 } };
		const second = { a: { c: 2 } };
		const merged = objMerge(first, second) as any;

		merged.a.b = 99;
		assert.deepStrictEqual(first, { a: { b: 1 } });
		assert.deepStrictEqual(second, { a: { c: 2 } });
	});

	it('objGet', () => {
		const data = { a: { b: { c: 42 } }, list: [1, { d: 'x' }], empty: null };

		assert.strictEqual(objGet(data, 'a.b.c'), 42);
		assert.strictEqual(objGet(data, 'list[0]'), 1);
		assert.strictEqual(objGet(data, 'list[1].d'), 'x');
		assert.strictEqual(objGet(data, 'list.1.d'), 'x');
		assert.deepStrictEqual(objGet(data, 'a.b'), { c: 42 });
		// A stored `null` is a value, not a missing path.
		assert.strictEqual(objGet(data, 'empty'), null);
		// Missing paths fall back.
		assert.strictEqual(objGet(data, 'a.zzz'), null);
		assert.strictEqual(objGet(data, 'a.zzz', { fallback: 'none' }), 'none');
		assert.strictEqual(objGet(data, 'a.b.c.d', { fallback: 0 }), 0);
		assert.strictEqual(objGet(data, 'list[9]', { fallback: 'none' }), 'none');
		assert.strictEqual(objGet(data, '', { fallback: 'none' }), 'none');
		assert.strictEqual(objGet(null as any, 'a', { fallback: 'none' }), 'none');
		// A quoted bracket key keeps the dot inside it.
		assert.strictEqual(objGet({ 'a.b': 1 }, '["a.b"]'), 1);
		assert.strictEqual(objGet({ 'a.b': 1 }, "['a.b']"), 1);
	});

	it('objPick', () => {
		assert.deepStrictEqual(objPick({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 });
		assert.deepStrictEqual(objPick({ a: 1, b: 2 }, 'a'), { a: 1 });
		assert.deepStrictEqual(objPick({ a: 1, b: 2 }, []), {});
		// A key that is not there is skipped rather than added as `undefined`.
		assert.deepStrictEqual(objPick({ a: 1 }, ['a', 'zzz']), { a: 1 });
		assert.deepStrictEqual(objPick({ a: null }, 'a'), { a: null });
		// The nested value is carried over as it is, and the source is not modified.
		const source = { a: { b: 1 }, c: 2 };
		assert.deepStrictEqual(objPick(source, 'a'), { a: { b: 1 } });
		assert.deepStrictEqual(source, { a: { b: 1 }, c: 2 });
		assert.strictEqual(objPick(null as any, 'a'), null);
		assert.strictEqual(objPick('abc' as any, 'a'), null);
	});

	it('objPickBy', () => {
		assert.deepStrictEqual(
			objPickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1),
			{ b: 2, c: 3 }
		);
		assert.deepStrictEqual(
			objPickBy({ a: 1, b: 2 }, (value, key) => key === 'a'),
			{ a: 1 }
		);
		assert.deepStrictEqual(
			objPickBy({ a: null, b: 1 }, (value) => value !== null),
			{ b: 1 }
		);
		assert.deepStrictEqual(
			objPickBy({ a: 1 }, () => false),
			{}
		);
		assert.deepStrictEqual(
			objPickBy({}, () => true),
			{}
		);
		// Only the top level is inspected; a nested object is carried over as it is.
		assert.deepStrictEqual(
			objPickBy({ a: { b: 1 }, c: 2 }, (value) => typeof value === 'object'),
			{ a: { b: 1 } }
		);
		assert.strictEqual(
			objPickBy(null as any, () => true),
			null
		);

		// The original object is not modified.
		const original = { a: 1, b: 2 };

		objPickBy(original, (value) => value > 1);
		assert.deepStrictEqual(original, { a: 1, b: 2 });
	});

	it('objMapKeys', () => {
		assert.deepStrictEqual(
			objMapKeys({ a: 1, b: 2 }, (value, key) => key.toUpperCase()),
			{ A: 1, B: 2 }
		);
		assert.deepStrictEqual(
			objMapKeys({ a: 1, b: 2 }, (value, key) => `${key}${value}`),
			{ a1: 1, b2: 2 }
		);
		// When two keys map onto the same name, the later one wins.
		assert.deepStrictEqual(
			objMapKeys({ a: 1, b: 2 }, () => 'x'),
			{ x: 2 }
		);
		assert.deepStrictEqual(
			objMapKeys({}, (value, key) => key),
			{}
		);
		// The keys of a nested object are left alone.
		assert.deepStrictEqual(
			objMapKeys({ a: { b: 1 } }, (value, key) => key.toUpperCase()),
			{ A: { b: 1 } }
		);
		assert.strictEqual(
			objMapKeys(null as any, (value, key) => key),
			null
		);

		// The original object is not modified.
		const original = { a: 1 };

		objMapKeys(original, (value, key) => key.toUpperCase());
		assert.deepStrictEqual(original, { a: 1 });
	});

	it('objInvert', () => {
		assert.deepStrictEqual(objInvert({ a: 1, b: 2 }), { '1': 'a', '2': 'b' });
		assert.deepStrictEqual(objInvert({ a: 'x', b: 'y' }), { x: 'a', y: 'b' });
		// Two entries sharing a value land on the same key, so the later one wins.
		assert.deepStrictEqual(objInvert({ a: 1, b: 1 }), { '1': 'b' });
		assert.deepStrictEqual(objInvert({ a: true, b: null }), { true: 'a', null: 'b' });
		// A whole number is written without a fractional part in every language.
		assert.deepStrictEqual(objInvert({ a: 1.0, b: 1.5 }), { '1': 'a', '1.5': 'b' });
		assert.deepStrictEqual(objInvert({}), {});
		assert.strictEqual(objInvert(null as any), null);

		// The original object is not modified.
		const original = { a: 1 };

		objInvert(original);
		assert.deepStrictEqual(original, { a: 1 });
	});
});
