const assert = require('assert');
const _ = require('../format');

describe('Format', () => {
  it('number', (done) => {
    assert.strictEqual(_.number('1234'), '1,234');
    assert.strictEqual(_.number(1234), '1,234');
    assert.strictEqual(_.number(12345678), '12,345,678');
    assert.strictEqual(_.number(null), '0');
    done();
  });

  it('fileSize', (done) => {
    assert.strictEqual(_.fileExt('C:\\Users\\test\\Desktop\\text.txt'), 'txt');
    assert.strictEqual(_.fileExt('hello.html'), 'html');
    assert.strictEqual(_.fileExt('this.is.file.PNG'), 'png');
    assert.strictEqual(_.fileExt('no-ext'), 'Unknown');
    done();
  });

  it('fileExt', (done) => {
    assert.strictEqual(_.fileSize(1), '1 Bytes');
    assert.strictEqual(_.fileSize(1000000), '976.56 KB');
    assert.strictEqual(_.fileSize(2000, 3), '1.953 KB');
    assert.strictEqual(_.fileSize(250000000), '238.42 MB');
    done();
  });

  it('msToTime', (done) => {
    assert.strictEqual(_.msToTime(100000), '00:01:40');
    assert.strictEqual(_.msToTime(100000, true), '00:01:40.0');
    assert.strictEqual(_.msToTime(100000, false, '-'), '00-01-40');
    assert.strictEqual(_.msToTime(123456789), '34:17:36');
    done();
  });

  it('secToTime', (done) => {
    assert.strictEqual(_.secToTime(60), '00:01:00');
    assert.strictEqual(_.secToTime(3800, '-'), '01-03-20');
    assert.strictEqual(_.secToTime(360000), '100:00:00');
    done();
  });
});
