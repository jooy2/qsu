const assert = require('assert');
const { empty } = require('../verify');

describe('Verify', () => {
  it('empty', (done) => {
    assert.strictEqual(empty(), true);
    assert.strictEqual(empty(''), true);
    assert.strictEqual(empty('1234'), false);
    assert.strictEqual(empty(1234), false);
    assert.strictEqual(empty(1.234), false);
    assert.strictEqual(empty(null), true);
    assert.strictEqual(empty([]), true);
    assert.strictEqual(empty([{}]), false);
    assert.strictEqual(empty([[]]), false);
    assert.strictEqual(empty(['1234']), false);
    assert.strictEqual(empty({}), true);
    assert.strictEqual(empty({ a: '1234' }), false);
    done();
  });
});
