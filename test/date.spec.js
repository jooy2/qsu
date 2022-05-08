import assert from 'assert';
import moment from 'moment';
import _ from '../dist/index.js';

describe('Date', () => {
  it('dayDiff', (done) => {
    assert.strictEqual(_.dayDiff(new Date('2021-01-01'), new Date('2021-01-02')), 1);
    assert.strictEqual(_.dayDiff(new Date('2021-01-01'), new Date('2021-02-28')), 58);
    done();
  });

  it('today', (done) => {
    assert.strictEqual(_.today(), moment().format('YYYY-MM-DD'));
    assert.strictEqual(_.today('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    assert.strictEqual(_.today('yyyy'), moment().format('YYYY'));
    done();
  });

  it('isRealDate', (done) => {
    assert.strictEqual(_.isRealDate('2021-01-01'), true);
    assert.strictEqual(_.isRealDate('2021-02-28'), true);
    assert.strictEqual(_.isRealDate('2021-02-29'), false);
    assert.strictEqual(_.isRealDate('2021-03-32'), false);
    assert.strictEqual(_.isRealDate('2021-13-01'), false);
    done();
  });

  it('convertDate', (done) => {
    assert.strictEqual(_.convertDate('20210101'), '2021-01-01');
    assert.strictEqual(_.convertDate('20210101', 'YYYY-MM-DD'), '2021-01-01');
    assert.strictEqual(_.convertDate('20210101', 'YYYY'), '2021');
    assert.strictEqual(_.convertDate('2021', 'YYYY-MM-DD'), '2021-01-01');
    done();
  });
});
