import assert from 'assert';
import { format } from 'date-fns';
import { dayDiff, today, isValidDate, dateToYYYYMMDD } from '../dist';

describe('Date', () => {
	it('dayDiff', (done) => {
		assert.strictEqual(dayDiff(new Date('2021-01-01'), new Date('2021-01-02')), 1);
		assert.strictEqual(dayDiff(new Date('2021-01-01'), new Date('2021-02-28')), 58);
		done();
	});

	it('today', (done) => {
		assert.strictEqual(today(), format(new Date(), 'yyyy-MM-dd'));
		assert.strictEqual(today('/'), format(new Date(), 'yyyy/MM/dd'));
		assert.strictEqual(today('/', false), format(new Date(), 'MM/dd/yyyy'));
		done();
	});

	it('isValidDate', (done) => {
		assert.strictEqual(isValidDate('2021-01-01'), true);
		assert.strictEqual(isValidDate('2021-02-28'), true);
		assert.strictEqual(isValidDate('2021-02-29'), false);
		assert.strictEqual(isValidDate('2021-03-32'), false);
		assert.strictEqual(isValidDate('2021-13-01'), false);
		done();
	});

	it('dateToYYYYMMDD', (done) => {
		assert.strictEqual(dateToYYYYMMDD(new Date('2023-05-15T01:01:00Z')), '2023-05-15');
		assert.strictEqual(dateToYYYYMMDD(new Date(2023, 11, 31), '/'), '2023/12/31');
		done();
	});
});
