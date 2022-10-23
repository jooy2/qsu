import assert from 'assert';
import { numRandom, sum, mul } from '../dist';

describe('Math', () => {
  it('numRandom', (done) => {
    assert(typeof numRandom(1, 2) === 'number');
    for (let i = 0; i < 50; i += 1) {
      const offsetTest: number = numRandom(5, 10);
      assert(offsetTest >= 5 && offsetTest <= 10);
    }
    done();
  });

  it('sum', (done) => {
    assert.strictEqual(sum(1, 2, 3, 4), 10);
    assert.strictEqual(sum([1, 2, 3]), 6);
    done();
  });

  it('mul', (done) => {
    assert.strictEqual(mul(1, 2, 3, 4), 24);
    assert.strictEqual(mul([1, 2, 3]), 6);
    assert.strictEqual(mul(1, 5, 7, 0, 9), 0);
    done();
  });
});
