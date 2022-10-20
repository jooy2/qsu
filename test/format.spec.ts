import assert from 'assert';
import _ from '../dist/index.js';

describe('Format', () => {
  it('numberFormat', (done) => {
    assert.strictEqual(_.numberFormat(1234), '1,234');
    assert.strictEqual(_.numberFormat(12345678), '12,345,678');
    // @ts-ignore
    assert.strictEqual(_.numberFormat(null), '0');
    done();
  });

  it('fileName', (done) => {
    assert.strictEqual(_.fileName('C:\\Users\\test\\Desktop\\text.txt'), 'text');
    assert.strictEqual(_.fileName('/home/user/Desktop/example.txt'), 'example');
    assert.strictEqual(_.fileName('C:\\example.txt', true), 'example.txt');
    done();
  });

  it('fileExt', (done) => {
    assert.strictEqual(_.fileExt('C:\\Users\\test\\Desktop\\text.txt'), 'txt');
    assert.strictEqual(_.fileExt('hello.html'), 'html');
    assert.strictEqual(_.fileExt('this.is.file.PNG'), 'png');
    assert.strictEqual(_.fileExt('no-ext'), 'Unknown');
    done();
  });

  it('fileSize', (done) => {
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
    assert.strictEqual(_.secToTime(3800, false, '-'), '01-03-20');
    assert.strictEqual(_.secToTime(360000), '100:00:00');
    done();
  });

  it('license', (done) => {
    assert(_.license({ type: 'mit', author: 'example', yearStart: 2021 }));
    assert(_.license({ type: 'apache20', author: 'example', yearStart: 2021 }));
    done();
  });
});
