import assert from 'assert';
import dayjs from 'dayjs';
import { dayDiff, today, isValidDate, dateToYYYYMMDD, createDateListFromRange } from '../dist';

describe('Date', () => {
	it('dayDiff', (done) => {
		assert.strictEqual(dayDiff(new Date('2021-01-01'), new Date('2021-01-02')), 1);
		assert.strictEqual(dayDiff(new Date('2021-01-01'), new Date('2021-02-28')), 58);
		done();
	});

	it('today', (done) => {
		assert.strictEqual(today(), dayjs().format('YYYY-MM-DD'));
		assert.strictEqual(today('/'), dayjs().format('YYYY/MM/DD'));
		assert.strictEqual(today('/', false), dayjs().format('MM/DD/YYYY'));
		done();
	});

	it('isValidDate', (done) => {
		assert.strictEqual(isValidDate('2021-01-01'), true);
		assert.strictEqual(isValidDate('2021-02-28'), true);
		assert.strictEqual(isValidDate('0024-01-01'), true);
		assert.strictEqual(isValidDate('9999-12-12'), true);
		assert.strictEqual(isValidDate('2024-02-29'), true);
		assert.strictEqual(isValidDate('2021-02-29'), false);
		assert.strictEqual(isValidDate('2021-03-32'), false);
		assert.strictEqual(isValidDate('2021-13-01'), false);
		assert.strictEqual(isValidDate('0000-01-01'), false);
		done();
	});

	it('dateToYYYYMMDD', (done) => {
		assert.strictEqual(dateToYYYYMMDD(new Date('2023-05-15T01:01:00Z')), '2023-05-15');
		assert.strictEqual(dateToYYYYMMDD(new Date(2023, 11, 31), '/'), '2023/12/31');
		done();
	});

	it('createDateListFromRange', (done) => {
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
		done();
	});
});
