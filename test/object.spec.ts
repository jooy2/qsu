import assert from 'assert';
import { objToQueryString, objToPrettyStr } from '../dist';

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
});
