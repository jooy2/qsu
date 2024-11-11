import assert from 'assert';
import { describe, it } from 'node:test';
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
	isEmail,
	isTrueMinimumNumberOfTimes
} from '../dist';

describe('Verify', () => {
	it('isObject', () => {
		assert.strictEqual(isObject('{}'), false);
		assert.strictEqual(isObject(true), false);
		assert.strictEqual(isObject(false), false);
		assert.strictEqual(isObject(null), false);
		assert.strictEqual(isObject(undefined), false);
		assert.strictEqual(isObject(1), false);
		assert.strictEqual(isObject([]), false);
		assert.strictEqual(
			isObject(() => '123'),
			false
		);
		assert.strictEqual(isObject({}), true);
		assert.strictEqual(isObject([1, 2]), false);
		assert.strictEqual(isObject([{ a: 1, b: 2 }]), false);
		assert.strictEqual(isObject({ a: 1, b: 2 }), true);
		assert.strictEqual(isObject({ a: {}, b: [] }), true);
	});

	it('isEqual', () => {
		const val1 = 'abc';
		const val2 = 'abc';
		const val3 = 'abc';

		assert.strictEqual(isEqual(1, [1, 2, 3]), false);
		assert.strictEqual(isEqual('abc', [val1, val2, val3]), true);
		assert.strictEqual(isEqual('123', ['123', 123]), true);
		assert.strictEqual(isEqual(123, '123', 123), true);
	});

	it('isEqualStrict', () => {
		const val1 = 'abc';
		const val2 = 'abc';
		const val3 = 'abc';

		assert.strictEqual(isEqualStrict(1, [1, 2, 3, 4, 5]), false);
		assert.strictEqual(isEqualStrict('abc', [val1, val2, val3]), true);
		assert.strictEqual(isEqualStrict('123', ['123', 123]), false);
		assert.strictEqual(isEqualStrict('123', ['123', '123']), true);
		assert.strictEqual(isEqualStrict(123, '123', 123), false);
	});

	it('isEmpty', () => {
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
	});

	it('isUrl', () => {
		assert.strictEqual(isUrl(''), false);
		assert.strictEqual(isUrl('https://'), false);
		assert.strictEqual(isUrl('www.google.com'), false);
		assert.strictEqual(isUrl('www.google.com', true), true);
		assert.strictEqual(isUrl('https://google.com'), true);
		assert.strictEqual(isUrl('https://google.com', true), true);
		assert.strictEqual(isUrl('https://google'), true);
		assert.strictEqual(isUrl('https://google', false, true), false);
		assert.strictEqual(isUrl('https://google.com?query=qsu'), true);
	});

	it('contains', () => {
		assert.strictEqual(contains('12345', '3'), true);
		assert.strictEqual(contains('12345', '10'), false);
		assert.strictEqual(contains('ABC', ['A', 'B', 'C']), true);
		assert.strictEqual(contains('ABC', ['D', 'E', 'F']), false);
		assert.strictEqual(contains('ABC', ['AB', 'C'], true), false);
		assert.strictEqual(contains('AB', ['AB', 'C', 'D'], true), true);
	});

	it('is2dArray', () => {
		assert.strictEqual(is2dArray([]), false);
		assert.strictEqual(is2dArray([[], []]), true);
		assert.strictEqual(is2dArray([{ a: 1 }, { b: 2 }]), false);
		assert.strictEqual(is2dArray([[1], [2]]), true);
	});

	it('between', () => {
		assert.strictEqual(between([1, 10], 1), false);
		assert.strictEqual(between([1, 10], 1, true), true);
		assert.strictEqual(between([10, 100], 11), true);
	});

	it('len', () => {
		assert.strictEqual(len('12345'), 5);
		assert.strictEqual(len(12345), 5);
		assert.strictEqual(
			len(() => '123'),
			3
		);
		assert.strictEqual(len([1, 2, 3, 4]), 4);
		assert.strictEqual(len({ hello: 'world', lorem: 'ipsum' }), 2);
		assert.strictEqual(len([{ hello: 1, world: 2 }, { lorem: 3 }]), 2);
	});

	it('isEmail', () => {
		assert.strictEqual(isEmail('1@1.com'), true);
		assert.strictEqual(isEmail('abc@def.ghi'), true);
		assert.strictEqual(isEmail('abc@sub.domain.com'), true);
		assert.strictEqual(isEmail('a.bc@d.ef'), true);
		assert.strictEqual(isEmail('a-12_34@b-12-34.net'), true);
		assert.strictEqual(isEmail('@b1234.net'), false);
		assert.strictEqual(isEmail('a1234@b1234'), false);
		assert.strictEqual(isEmail('a_1234@b_1234.net'), false);
		assert.strictEqual(isEmail('abc@@def.com'), false);
		assert.strictEqual(isEmail('11.com'), false);
		assert.strictEqual(isEmail('sub.domain.com'), false);
		assert.strictEqual(isEmail('1@1@a.com'), false);
	});

	it('isTrueMinimumNumberOfTimes', () => {
		const left = 2;
		const right1 = 1 + 1;
		const right2 = 2 + 1;

		assert.strictEqual(isTrueMinimumNumberOfTimes([true, false, false]), true);
		assert.strictEqual(isTrueMinimumNumberOfTimes([true, true], 1), true);
		assert.strictEqual(isTrueMinimumNumberOfTimes([true, false, true], 2), true);
		assert.strictEqual(isTrueMinimumNumberOfTimes([true, false, true], 1), true);
		assert.strictEqual(
			isTrueMinimumNumberOfTimes([left === right1, false, true, true, false], 3),
			true
		);
		assert.strictEqual(
			isTrueMinimumNumberOfTimes([left === right2, false, true, true, false], 3),
			false
		);
	});
});
