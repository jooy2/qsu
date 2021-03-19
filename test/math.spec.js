const assert = require('assert');
const math = require('../math');

describe('Math', () => {
  it('rand', (done) => {
    assert(typeof math.rand() === 'number');
    assert(typeof math.rand(1) === 'number');
    assert(typeof math.rand(1, 2) === 'number');
    for (let i = 0; i < 50; i += 1) {
      assert(math.rand() <= 1);
      assert(math.rand(5) <= 5);
      const offsetTest = math.rand(5, 10);
      assert(offsetTest >= 5 && offsetTest <= 10);
    }
    done();
  });
});
