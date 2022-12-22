import assert from 'assert';
import {
	isObject,
	isEqual,
	isEqualStrict,
	isEmpty,
	isUrl,
	contains,
	is2dArray,
	between,
	len,
	isBotAgent
} from '../dist';

describe('Verify', () => {
	it('isObject', (done) => {
		assert.strictEqual(isObject(1), false);
		assert.strictEqual(isObject([1, 2]), false);
		assert.strictEqual(isObject([{ a: 1, b: 2 }]), false);
		assert.strictEqual(isObject({ a: 1, b: 2 }), true);
		assert.strictEqual(isObject({ a: {}, b: [] }), true);
		done();
	});

	it('isEqual', (done) => {
		const val1 = 'abc';
		const val2 = 'abc';
		const val3 = 'abc';

		assert.strictEqual(isEqual(1, [1, 2, 3]), false);
		assert.strictEqual(isEqual('abc', [val1, val2, val3]), true);
		assert.strictEqual(isEqual('123', ['123', 123]), true);
		assert.strictEqual(isEqual(123, '123', 123), true);
		done();
	});

	it('isEqualStrict', (done) => {
		const val1 = 'abc';
		const val2 = 'abc';
		const val3 = 'abc';

		assert.strictEqual(isEqualStrict(1, [1, 2, 3, 4, 5]), false);
		assert.strictEqual(isEqualStrict('abc', [val1, val2, val3]), true);
		assert.strictEqual(isEqualStrict('123', ['123', 123]), false);
		assert.strictEqual(isEqualStrict('123', ['123', '123']), true);
		assert.strictEqual(isEqualStrict(123, '123', 123), false);
		done();
	});

	it('isEmpty', (done) => {
		assert.strictEqual(isEmpty(''), true);
		assert.strictEqual(isEmpty('1234'), false);
		assert.strictEqual(isEmpty(1234), false);
		assert.strictEqual(isEmpty(1.234), false);
		assert.strictEqual(isEmpty(null), true);
		assert.strictEqual(isEmpty([]), true);
		assert.strictEqual(isEmpty([{}]), false);
		assert.strictEqual(isEmpty([[]]), false);
		assert.strictEqual(isEmpty(['1234']), false);
		assert.strictEqual(isEmpty({}), true);
		assert.strictEqual(isEmpty({ a: '1234' }), false);
		done();
	});

	it('isUrl', (done) => {
		assert.strictEqual(isUrl(''), false);
		assert.strictEqual(isUrl('https://'), false);
		assert.strictEqual(isUrl('www.google.com'), false);
		assert.strictEqual(isUrl('www.google.com', true), true);
		assert.strictEqual(isUrl('https://google.com'), true);
		assert.strictEqual(isUrl('https://google.com', true), true);
		assert.strictEqual(isUrl('https://google'), true);
		assert.strictEqual(isUrl('https://google', false, true), false);
		assert.strictEqual(isUrl('https://google.com?query=qsu'), true);
		done();
	});

	it('contains', (done) => {
		assert.strictEqual(contains('12345', '3'), true);
		assert.strictEqual(contains('12345', '10'), false);
		assert.strictEqual(contains('ABC', ['A', 'B', 'C']), true);
		assert.strictEqual(contains('ABC', ['D', 'E', 'F']), false);
		assert.strictEqual(contains('ABC', ['AB', 'C'], true), false);
		assert.strictEqual(contains('AB', ['AB', 'C', 'D'], true), true);
		done();
	});

	it('is2dArray', (done) => {
		assert.strictEqual(is2dArray([]), false);
		assert.strictEqual(is2dArray([[], []]), true);
		assert.strictEqual(is2dArray([{ a: 1 }, { b: 2 }]), false);
		assert.strictEqual(is2dArray([[1], [2]]), true);
		done();
	});

	it('between', (done) => {
		assert.strictEqual(between([1, 10], 1), false);
		assert.strictEqual(between([1, 10], 1, true), true);
		assert.strictEqual(between([10, 100], 11), true);
		done();
	});

	it('len', (done) => {
		assert.strictEqual(len('12345'), 5);
		assert.strictEqual(len(12345), 5);
		assert.strictEqual(
			len(() => '123'),
			3
		);
		assert.strictEqual(len([1, 2, 3, 4]), 4);
		assert.strictEqual(len({ hello: 'world', lorem: 'ipsum' }), 2);
		assert.strictEqual(len([{ hello: 1, world: 2 }, { lorem: 3 }]), 2);
		done();
	});

	it('isBotAgent', (done) => {
		assert.strictEqual(
			isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html'),
			true
		);
		assert.strictEqual(
			isBotAgent(
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
			),
			false
		);
		done();
	});
});
