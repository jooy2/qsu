import assert from 'assert';
import { describe, it } from 'node:test';
import {
	numberFormat,
	fileSizeFormat,
	fileSizeParts,
	duration,
	durationParts,
	safeJSONParse,
	safeParseInt
} from '../dist';

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

	// Pins the output produced before `standard` and `unitDisplay` existed. Every case
	// here has to keep reading exactly the same once an option is left out.
	it('fileSizeFormat (default output is unchanged)', () => {
		assert.strictEqual(fileSizeFormat(0), '0 Bytes');
		assert.strictEqual(fileSizeFormat(-1), '0 Bytes');
		assert.strictEqual(fileSizeFormat(0.5), '0 Bytes');
		assert.strictEqual(fileSizeFormat(1), '1 Bytes');
		assert.strictEqual(fileSizeFormat(1023), '1023 Bytes');
		assert.strictEqual(fileSizeFormat(1024), '1 KB');
		assert.strictEqual(fileSizeFormat(1025), '1 KB');
		assert.strictEqual(fileSizeFormat(1536), '1.5 KB');
		assert.strictEqual(fileSizeFormat(1048576), '1 MB');
		assert.strictEqual(fileSizeFormat(1073741824), '1 GB');
		// A negative `decimals` is treated as zero, and trailing zeros are dropped.
		assert.strictEqual(fileSizeFormat(1536, -1), '2 KB');
		assert.strictEqual(fileSizeFormat(1536, 0), '2 KB');
		assert.strictEqual(fileSizeFormat(1048576, 4), '1 MB');
		// `ceil` ignores `decimals` entirely.
		assert.strictEqual(fileSizeFormat(1025, 3, true), '2 KB');
		// Passing the options object without any key changes nothing either.
		assert.strictEqual(fileSizeFormat(1000000, 2, false, {}), '976.56 KB');
		assert.strictEqual(fileSizeFormat(1000000, 2, false, { standard: 'jedec' }), '976.56 KB');
		assert.strictEqual(fileSizeFormat(1000000, 2, false, { unitDisplay: 'short' }), '976.56 KB');
	});

	it('fileSizeFormat (standard)', () => {
		// `jedec` is the default: a 1024 divisor labelled `KB`.
		assert.strictEqual(fileSizeFormat(1000000, 2, false, { standard: 'jedec' }), '976.56 KB');
		// `iec` keeps the 1024 divisor and uses the prefix that means 1024.
		assert.strictEqual(fileSizeFormat(1000000, 2, false, { standard: 'iec' }), '976.56 KiB');
		assert.strictEqual(fileSizeFormat(1048576, 2, false, { standard: 'iec' }), '1 MiB');
		// `si` divides by 1000.
		assert.strictEqual(fileSizeFormat(1000000, 2, false, { standard: 'si' }), '1 MB');
		assert.strictEqual(fileSizeFormat(1000, 2, false, { standard: 'si' }), '1 kB');
		assert.strictEqual(fileSizeFormat(1024, 2, false, { standard: 'si' }), '1.02 kB');
		// The exponent 0 label carries no prefix, so it is the same in all three.
		assert.strictEqual(fileSizeFormat(500, 2, false, { standard: 'si' }), '500 Bytes');
		assert.strictEqual(fileSizeFormat(500, 2, false, { standard: 'iec' }), '500 Bytes');
	});

	it('fileSizeFormat (unitDisplay)', () => {
		assert.strictEqual(fileSizeFormat(1048576, 2, false, { unitDisplay: 'long' }), '1 Megabyte');
		assert.strictEqual(
			fileSizeFormat(1234567, 2, false, { unitDisplay: 'long' }),
			'1.18 Megabytes'
		);
		// The singular is decided by the rounded number, not the raw one.
		assert.strictEqual(fileSizeFormat(1234567, 0, false, { unitDisplay: 'long' }), '1 Megabyte');
		assert.strictEqual(fileSizeFormat(1, 2, false, { unitDisplay: 'long' }), '1 Byte');
		assert.strictEqual(fileSizeFormat(0, 2, false, { unitDisplay: 'long' }), '0 Bytes');
		assert.strictEqual(
			fileSizeFormat(1048576, 2, false, { standard: 'iec', unitDisplay: 'long' }),
			'1 Mebibyte'
		);
	});

	// The exponent used to run past the end of the unit table, which read as
	// `1 undefined` here and threw in the Dart and Python packages.
	it('fileSizeFormat (beyond the largest unit)', () => {
		assert.strictEqual(fileSizeFormat(1024 ** 8), '1 YB');
		assert.strictEqual(fileSizeFormat(1024 ** 9), '1024 YB');
		assert.strictEqual(fileSizeFormat(1024 ** 10), '1048576 YB');
	});

	it('fileSizeParts', () => {
		assert.deepStrictEqual(fileSizeParts(0), { value: 0, unit: 'Bytes', exponent: 0 });
		assert.deepStrictEqual(fileSizeParts(-1), { value: 0, unit: 'Bytes', exponent: 0 });
		assert.deepStrictEqual(fileSizeParts(1), { value: 1, unit: 'Bytes', exponent: 0 });
		assert.deepStrictEqual(fileSizeParts(1024), { value: 1, unit: 'KB', exponent: 1 });
		assert.deepStrictEqual(fileSizeParts(1048576), { value: 1, unit: 'MB', exponent: 2 });
		// The value is not rounded, so the caller's own formatter rounds once.
		assert.deepStrictEqual(fileSizeParts(1234567), {
			value: 1234567 / 1024 ** 2,
			unit: 'MB',
			exponent: 2
		});
		assert.deepStrictEqual(fileSizeParts(1000000, { standard: 'si' }), {
			value: 1,
			unit: 'MB',
			exponent: 2
		});
		assert.deepStrictEqual(fileSizeParts(1048576, { standard: 'iec' }), {
			value: 1,
			unit: 'MiB',
			exponent: 2
		});
		assert.deepStrictEqual(fileSizeParts(1048576, { unitDisplay: 'long' }), {
			value: 1,
			unit: 'Megabyte',
			exponent: 2
		});
		assert.deepStrictEqual(fileSizeParts(1024 ** 10), {
			value: 1024 ** 2,
			unit: 'YB',
			exponent: 8
		});
	});

	// `fileSizeFormat` is `fileSizeParts` with the number rounded and the unit appended,
	// so the two must never disagree about the unit or the magnitude.
	it('fileSizeParts agrees with fileSizeFormat', () => {
		for (const standard of ['jedec', 'iec', 'si'] as const) {
			for (const bytes of [0, 1, 999, 1024, 1048576, 1234567, 1e12, 1e18, 1024 ** 9]) {
				const parts = fileSizeParts(bytes, { standard });
				const rounded = parseFloat(parts.value.toFixed(2));

				assert.strictEqual(
					fileSizeFormat(bytes, 2, false, { standard }),
					`${rounded} ${parts.unit}`
				);
			}
		}
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

	it('durationParts', () => {
		assert.deepStrictEqual(durationParts(0), []);
		assert.deepStrictEqual(durationParts(604800000), [{ value: 7, unit: 'Day' }]);
		assert.deepStrictEqual(durationParts(1234567890), [
			{ value: 14, unit: 'Day' },
			{ value: 6, unit: 'Hour' },
			{ value: 56, unit: 'Minute' },
			{ value: 7, unit: 'Second' }
		]);
		assert.deepStrictEqual(durationParts(604800000, { withZeroValue: true }), [
			{ value: 7, unit: 'Day' },
			{ value: 0, unit: 'Hour' },
			{ value: 0, unit: 'Minute' },
			{ value: 0, unit: 'Second' }
		]);
		assert.deepStrictEqual(durationParts(1234567890, { maxUnitCount: 2 }), [
			{ value: 14, unit: 'Day' },
			{ value: 6, unit: 'Hour' }
		]);
		// Single-unit mode keeps the fraction.
		assert.deepStrictEqual(durationParts(1500, { unit: 'Second' }), [
			{ value: 1.5, unit: 'Second' }
		]);
		assert.deepStrictEqual(durationParts(90061001, { withMilliSeconds: true }), [
			{ value: 1, unit: 'Day' },
			{ value: 1, unit: 'Hour' },
			{ value: 1, unit: 'Minute' },
			{ value: 1, unit: 'Second' },
			{ value: 1, unit: 'Millisecond' }
		]);
	});

	// `duration` is `durationParts` with each piece labelled and joined, so the two must
	// never disagree about which units a duration is made of.
	it('durationParts agrees with duration', () => {
		for (const milliseconds of [0, 1000, 604800000, 1234567890, 90061001]) {
			const parts = durationParts(milliseconds);
			const joined = parts
				.map((part) => `${part.value} ${part.unit}${part.value === 1 ? '' : 's'}`)
				.join(' ');

			assert.strictEqual(duration(milliseconds), joined);
		}
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
