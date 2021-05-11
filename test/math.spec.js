const assert = require('assert');
const { rand, add } = require('../math');

describe('Math', () => {
  it('rand', (done) => {
    assert(typeof rand() === 'number');
    assert(typeof rand(1) === 'number');
    assert(typeof rand(1, 2) === 'number');
    for (let i = 0; i < 50; i += 1) {
      assert(rand() <= 1);
      assert(rand(5) <= 5);
      const offsetTest = rand(5, 10);
      assert(offsetTest >= 5 && offsetTest <= 10);
    }
    done();
  });

  it('add', (done) => {
    assert.strictEqual(add(1), 1);
    assert.strictEqual(add(1, 2, 3, 4), 10);
    assert.strictEqual(add([1, 2, 3]), 6);
    done();
  });
});
