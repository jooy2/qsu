import assert from 'assert';
import { describe, it } from 'node:test';
import { numberFormat, duration, safeJSONParse, safeParseInt } from '../dist';

describe('Format', () => {
	it('numberFormat', () => {
		assert.strictEqual(numberFormat(1234), '1,234');
		assert.strictEqual(numberFormat(1234.5678), '1,234.5678');
		assert.strictEqual(numberFormat(1234.0), '1,234');
		assert.strictEqual(numberFormat(12345678), '12,345,678');
		// @ts-ignore
		assert.strictEqual(numberFormat(null), '0');
		assert.strictEqual(numberFormat('123123'), '123,123');
	});

	it('duration', () => {
		assert.strictEqual(duration(0), '');
		assert.strictEqual(duration(604800000), '7 Days');
		assert.strictEqual(
			duration(604800000, {
				withZeroValue: true
			}),
			'7 Days 0 Hour 0 Minute 0 Second 0 Millisecond'
		);
		assert.strictEqual(
			duration(604800000, {
				useSpace: false
			}),
			'7Days'
		);
		assert.strictEqual(
			duration(604800000, {
				useShortString: true
			}),
			'7 D'
		);
		assert.strictEqual(
			duration(604800001, {
				separator: '-'
			}),
			'7 Days-1 Millisecond'
		);
		assert.strictEqual(
			duration(1234567890, {
				useSpace: true,
				useShortString: true
			}),
			'14 D 6 H 56 M 7 S 890 ms'
		);
		assert.strictEqual(
			duration(1234567890),
			'14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
		);
	});

	it('safeJSONParse', () => {
		assert.deepStrictEqual(safeJSONParse({}), {});
		assert.deepStrictEqual(safeJSONParse('{}'), {});
		assert.deepStrictEqual(safeJSONParse(''), {});
		assert.deepStrictEqual(safeJSONParse(null), {});
		assert.deepStrictEqual(safeJSONParse('{"a":1,"b":2}'), { a: 1, b: 2 });
		assert.deepStrictEqual(safeJSONParse('{"a":{"aa":1},"b":null}'), { a: { aa: 1 }, b: null });
	});

	it('safeParseInt', () => {
		assert.deepStrictEqual(safeParseInt(null), 0);
		assert.deepStrictEqual(safeParseInt('', -1), -1);
		assert.deepStrictEqual(safeParseInt('0001234'), 1234);
		assert.deepStrictEqual(safeParseInt('1.234.567'), 1);
		assert.deepStrictEqual(safeParseInt('1234', 10), 1234);
		assert.deepStrictEqual(safeParseInt('1234', 0, 16), 4660);
	});
});
