import assert from 'assert';
import { objToQueryString, objToPrettyStr, objFindItemRecursiveByKey } from '../dist';

describe('Misc', () => {
	it('funcTimes', (done) => {
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
		done();
	});

	it('objToPrettyStr', (done) => {
		assert.deepStrictEqual(objToPrettyStr({}), '{}');
		assert.deepStrictEqual(
			objToPrettyStr({ a: 1, b: { c: 1, d: 2 } }),
			'{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
		);
		done();
	});

	it('objFindItemRecursiveByKey', (done) => {
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
		done();
	});
});
