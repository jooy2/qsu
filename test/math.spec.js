import assert from 'assert';
import _ from '../dist/index.js';

describe('Math', () => {
  it('numRandom', (done) => {
    assert(typeof _.numRandom(1, 2) === 'number');
    for (let i = 0; i < 50; i += 1) {
      const offsetTest = _.numRandom(5, 10);
      assert(offsetTest >= 5 && offsetTest <= 10);
    }
    done();
  });

  it('sum', (done) => {
    assert.strictEqual(_.sum(1, 2, 3, 4), 10);
    assert.strictEqual(_.sum([1, 2, 3]), 6);
    done();
  });

  it('mul', (done) => {
    assert.strictEqual(_.mul(1, 2, 3, 4), 24);
    assert.strictEqual(_.mul([1, 2, 3]), 6);
    assert.strictEqual(_.mul(1, 5, 7, 0, 9), 0);
    done();
  });
});
