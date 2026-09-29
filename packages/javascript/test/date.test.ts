import assert from 'assert';
import { describe, it } from 'node:test';
import dayjs from 'dayjs';
import {
	dayDiff,
	today,
	isValidDate,
	dateToYYYYMMDD,
	createDateListFromRange,
	isLeapYear,
	getDaysInMonth
} from '../dist';

describe('Date', () => {
	it('dayDiff', () => {
		assert.strictEqual(dayDiff(new Date('2021-01-01'), new Date('2021-01-02')), 1);
		assert.strictEqual(dayDiff(new Date('2021-01-01'), new Date('2021-02-28')), 58);
	});

	it('today', () => {
		assert.strictEqual(today(), dayjs().format('YYYY-MM-DD'));
		assert.strictEqual(today('/'), dayjs().format('YYYY/MM/DD'));
		assert.strictEqual(today('/', false), dayjs().format('MM/DD/YYYY'));
	});

	it('isValidDate', () => {
		assert.strictEqual(isValidDate('2021-01-01'), true);
		assert.strictEqual(isValidDate('2021-02-28'), true);
		assert.strictEqual(isValidDate('0024-01-01'), true);
		assert.strictEqual(isValidDate('9999-12-12'), true);
		assert.strictEqual(isValidDate('2024-02-29'), true);
		assert.strictEqual(isValidDate('0001-01-01'), false); // does not support validation
		assert.strictEqual(isValidDate('2021-02-29'), false);
		assert.strictEqual(isValidDate('2021-03-32'), false);
		assert.strictEqual(isValidDate('2021-13-01'), false);
		assert.strictEqual(isValidDate('0000-01-01'), false);
	});

	it('dateToYYYYMMDD', () => {
		assert.strictEqual(dateToYYYYMMDD(new Date('2023-05-15T01:01:00Z')), '2023-05-15');
		assert.strictEqual(dateToYYYYMMDD(new Date(2023, 11, 31), '/'), '2023/12/31');
	});

	it('isLeapYear', () => {
		assert.strictEqual(isLeapYear(2024), true);
		assert.strictEqual(isLeapYear(2023), false);
		assert.strictEqual(isLeapYear(1900), false);
		assert.strictEqual(isLeapYear(2000), true);
		// The rule carries on to year 0 and to negative years.
		assert.strictEqual(isLeapYear(0), true);
		assert.strictEqual(isLeapYear(-4), true);
		assert.strictEqual(isLeapYear(-100), false);
	});

	it('getDaysInMonth', () => {
		assert.strictEqual(getDaysInMonth(2024, 2), 29);
		assert.strictEqual(getDaysInMonth(2023, 2), 28);
		assert.strictEqual(getDaysInMonth(1900, 2), 28);
		assert.strictEqual(getDaysInMonth(2000, 2), 29);
		assert.strictEqual(getDaysInMonth(2024, 1), 31);
		assert.strictEqual(getDaysInMonth(2024, 4), 30);
		assert.strictEqual(getDaysInMonth(2024, 12), 31);

		// `month` counts from 1, so 0 is out of range as well as 13.
		const monthError = { name: 'RangeError', message: '`month` must be an integer from 1 to 12.' };

		assert.throws(() => getDaysInMonth(2024, 0), monthError);
		assert.throws(() => getDaysInMonth(2024, 13), monthError);
		assert.throws(() => getDaysInMonth(2024, 1.5), monthError);
	});

	it('createDateListFromRange', () => {
		assert.deepStrictEqual(
			createDateListFromRange(new Date('2023-01-01T01:00:00Z'), new Date('2023-01-05T01:00:00Z')),
			['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05']
		);
		assert.deepStrictEqual(
			createDateListFromRange(new Date('2023-12-30T01:00:00Z'), new Date('2023-12-30T05:00:00Z')),
			['2023-12-30']
		);
		assert.deepStrictEqual(
			createDateListFromRange(new Date('2023-01-30T01:00:00Z'), new Date('2023-03-05T09:00:00Z')),
			[
				'2023-01-30',
				'2023-01-31',
				'2023-02-01',
				'2023-02-02',
				'2023-02-03',
				'2023-02-04',
				'2023-02-05',
				'2023-02-06',
				'2023-02-07',
				'2023-02-08',
				'2023-02-09',
				'2023-02-10',
				'2023-02-11',
				'2023-02-12',
				'2023-02-13',
				'2023-02-14',
				'2023-02-15',
				'2023-02-16',
				'2023-02-17',
				'2023-02-18',
				'2023-02-19',
				'2023-02-20',
				'2023-02-21',
				'2023-02-22',
				'2023-02-23',
				'2023-02-24',
				'2023-02-25',
				'2023-02-26',
				'2023-02-27',
				'2023-02-28',
				'2023-03-01',
				'2023-03-02',
				'2023-03-03',
				'2023-03-04',
				'2023-03-05'
			]
		);
	});
});
