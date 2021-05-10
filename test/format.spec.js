const assert = require('assert');
const { number, fileSize, msToTime } = require('../format');

describe('Format', () => {
  it('number', (done) => {
    assert.strictEqual(number('1234'), '1,234');
    assert.strictEqual(number(1234), '1,234');
    assert.strictEqual(number(12345678), '12,345,678');
    assert.strictEqual(number(null), '0');
    done();
  });

  it('fileSize', (done) => {
    assert.strictEqual(fileSize(1), '1 Bytes');
    assert.strictEqual(fileSize(1000000), '976.56 KB');
    assert.strictEqual(fileSize(2000, 3), '1.953 KB');
    assert.strictEqual(fileSize(250000000), '238.42 MB');
    done();
  });

  it('msToTime', (done) => {
    assert.strictEqual(msToTime(100000), '00:01:40');
    assert.strictEqual(msToTime(100000, true), '00:01:40.0');
    assert.strictEqual(msToTime(100000, false, '-'), '00-01-40');
    assert.strictEqual(msToTime(123456789), '34:17:36');
    done();
  });
});
