const assert = require('assert');
const moment = require('moment');
const {
  dayDiff, today, isRealDate, convertDate,
} = require('../date');

describe('Date', () => {
  it('dayDiff', (done) => {
    assert.strictEqual(dayDiff('2021-01-01', '2021-01-02'), 1);
    assert.strictEqual(dayDiff('2021-01-01', '2021-02-28'), 55);
    done();
  });

  it('today', (done) => {
    assert.strictEqual(today(), moment().format('YYYY-MM-DD'));
    assert.strictEqual(today(1), null);
    assert.strictEqual(today('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    assert.strictEqual(today('yyyy'), moment().format('YYYY'));
    done();
  });

  it('isRealDate', (done) => {
    assert.strictEqual(isRealDate('2021-01-01'), true);
    assert.strictEqual(isRealDate('2021-02-28'), true);
    assert.strictEqual(isRealDate('2021-02-29'), false);
    assert.strictEqual(isRealDate('2021-03-32'), false);
    assert.strictEqual(isRealDate('2021-13-01'), false);
    done();
  });

  it('convertDate', (done) => {
    assert.strictEqual(convertDate('20210101'), '2021-01-01');
    assert.strictEqual(convertDate('20210101', 'YYYY-MM-DD'), '2021-01-01');
    assert.strictEqual(convertDate('20210101', 'YYYY'), '2021');
    assert.strictEqual(convertDate('2021', 'YYYY-MM-DD'), '2021-01-01');
    done();
  });
});
