const assert = require('assert');
const moment = require('moment');
const { dayDiff, today } = require('../date');

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
});
