import assert from 'assert';
import { format } from 'date-fns';
import _ from '../dist/index.js';

describe('Date', () => {
  it('dayDiff', (done) => {
    assert.strictEqual(_.dayDiff(new Date('2021-01-01'), new Date('2021-01-02')), 1);
    assert.strictEqual(_.dayDiff(new Date('2021-01-01'), new Date('2021-02-28')), 58);
    done();
  });

  it('today', (done) => {
    assert.strictEqual(_.today(), format(new Date(), 'yyyy-MM-dd'));
    assert.strictEqual(_.today('/'), format(new Date(), 'yyyy/MM/dd'));
    assert.strictEqual(_.today('/', false), format(new Date(), 'MM/dd/yyyy'));
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
});
