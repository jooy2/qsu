const assert = require('assert');
const moment = require('moment');
const date = require('../date');

describe('Date', () => {
  it('dayDiff', (done) => {
    assert.strictEqual(date.dayDiff('2021-01-01', '2021-01-02'), 1);
    assert.strictEqual(date.dayDiff('2021-01-01', '2021-02-28'), 55);
    done();
  });

  it('getToday', (done) => {
    assert.strictEqual(date.getToday(), moment().format('YYYY-MM-DD'));
    assert.strictEqual(date.getToday(1), null);
    assert.strictEqual(date.getToday('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    assert.strictEqual(date.getToday('yyyy'), moment().format('YYYY'));
    done();
  });
});
