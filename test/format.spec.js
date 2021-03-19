const assert = require('assert');
const { number } = require('../format');

describe('Format', () => {
  it('number', (done) => {
    assert.strictEqual(number('1234'), '1,234');
    assert.strictEqual(number(1234), '1,234');
    assert.strictEqual(number(12345678), '12,345,678');
    assert.strictEqual(number(null), '0');
    done();
  });
});
