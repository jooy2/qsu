import assert from 'assert';
import { describe, it } from 'node:test';
import { numberFormat, fileSizeFormat, duration, safeJSONParse, safeParseInt } from '../dist';

describe('Format', () => {
	it('numberFormat', () => {
		assert.strictEqual(numberFormat(0), '0');
		assert.strictEqual(numberFormat(1234), '1,234');
		assert.strictEqual(numberFormat(1234.5678), '1,234.5678');
		assert.strictEqual(numberFormat(1234.0), '1,234');
		assert.strictEqual(numberFormat(12345678), '12,345,678');
		assert.strictEqual(numberFormat(-123), '-123');
		assert.strictEqual(numberFormat(-12345678), '-12,345,678');
		// @ts-expect-error number is null
		assert.strictEqual(numberFormat(null), '');
		assert.strictEqual(numberFormat('123123'), '123,123');
	});

	it('fileSizeFormat', () => {
		assert.strictEqual(fileSizeFormat(0), '0 Bytes');
		assert.strictEqual(fileSizeFormat(0.0, 0, true), '0 Bytes');
		assert.strictEqual(fileSizeFormat(1), '1 Bytes');
		assert.strictEqual(fileSizeFormat(1000000), '976.56 KB');
		assert.strictEqual(fileSizeFormat(100000000, 3), '95.367 MB');
		assert.strictEqual(fileSizeFormat(100000000, 3, true), '96 MB');
		assert.strictEqual(fileSizeFormat(123456789012, 0, true), '115 GB');
	});

	it('duration', () => {
		assert.strictEqual(duration(0), '');
		assert.strictEqual(duration(604800000), '7 Days');
		// Milliseconds are hidden by default (withMilliSeconds defaults to false).
		assert.strictEqual(duration(1234567890), '14 Days 6 Hours 56 Minutes 7 Seconds');
		// Grammatically correct plurals: 0 -> plural, 1 -> singular.
		assert.strictEqual(
			duration(604800000, {
				withZeroValue: true
			}),
			'7 Days 0 Hours 0 Minutes 0 Seconds'
		);
		assert.strictEqual(duration(90000000), '1 Day 1 Hour');
		// Interior zero units are dropped unless withZeroValue is set.
		assert.strictEqual(duration(86700000), '1 Day 5 Minutes');
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
	});

	it('duration - months and years', () => {
		// A month is 30 days, a year is 365 days.
		assert.strictEqual(duration(2592000000), '1 Month');
		assert.strictEqual(duration(3456000000), '1 Month 10 Days');
		assert.strictEqual(duration(31536000000), '1 Year');
		assert.strictEqual(duration(34560000000), '1 Year 1 Month 5 Days');
		// Month short is `Mo` to avoid clashing with Minute (`M`).
		assert.strictEqual(duration(34560000000, { useShortString: true }), '1 Y 1 Mo 5 D');
	});

	it('duration - withMilliSeconds', () => {
		assert.strictEqual(
			duration(1234567890, {
				withMilliSeconds: true
			}),
			'14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
		);
		assert.strictEqual(
			duration(1234567890, {
				withMilliSeconds: true,
				useSpace: true,
				useShortString: true
			}),
			'14 D 6 H 56 M 7 S 890 ms'
		);
		assert.strictEqual(
			duration(604800001, {
				withMilliSeconds: true,
				separator: '-'
			}),
			'7 Days-1 Millisecond'
		);
	});

	it('duration - maxUnitCount', () => {
		assert.strictEqual(
			duration(34560000000, {
				maxUnitCount: 2
			}),
			'1 Year 1 Month'
		);
		assert.strictEqual(
			duration(1234567890, {
				maxUnitCount: 1
			}),
			'14 Days'
		);
		assert.strictEqual(
			duration(1234567890, {
				withMilliSeconds: true,
				maxUnitCount: 3
			}),
			'14 Days 6 Hours 56 Minutes'
		);
	});

	it('duration - single unit', () => {
		assert.strictEqual(duration(172800000, { unit: 'Hour' }), '48 Hours');
		assert.strictEqual(duration(1800000, { unit: 'Hour' }), '0.5 Hours');
		assert.strictEqual(duration(3600000, { unit: 'Hour' }), '1 Hour');
		assert.strictEqual(duration(86400000, { unit: 'Minute' }), '1440 Minutes');
		assert.strictEqual(duration(86400000, { unit: 'Day' }), '1 Day');
		assert.strictEqual(duration(172800000, { unit: 'Hour', useShortString: true }), '48 H');
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
