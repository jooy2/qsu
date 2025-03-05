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
	objMergeNewKey
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
});
