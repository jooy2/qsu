const assert = require('assert');
const format = require('../format');

describe('Format', () => {
  it('numberFormat', (done) => {
    assert.strictEqual(format.numberFormat('1234'), '1,234');
    assert.strictEqual(format.numberFormat(1234), '1,234');
    assert.strictEqual(format.numberFormat(12345678), '12,345,678');
    assert.strictEqual(format.numberFormat(null), '0');
    done();
  });
});
