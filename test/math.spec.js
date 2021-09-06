const assert = require('assert');
const _ = require('../math');

describe('Math', () => {
  it('rand', (done) => {
    assert(typeof _.rand() === 'number');
    assert(typeof _.rand(1) === 'number');
    assert(typeof _.rand(1, 2) === 'number');
    for (let i = 0; i < 50; i += 1) {
      assert(_.rand() <= 1);
      assert(_.rand(5) <= 5);
      const offsetTest = _.rand(5, 10);
      assert(offsetTest >= 5 && offsetTest <= 10);
    }
    done();
  });

  it('add', (done) => {
    assert.strictEqual(_.add(1, 2, 3, 4), 10);
    assert.strictEqual(_.add([1, 2, 3]), 6);
    done();
  });

  it('mul', (done) => {
    assert.strictEqual(_.mul(1, 2, 3, 4), 24);
    assert.strictEqual(_.mul([1, 2, 3]), 6);
    assert.strictEqual(_.mul(1, 5, 7, 0, 9), 0);
    done();
  });
});
