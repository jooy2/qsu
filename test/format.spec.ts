import assert from 'assert';
import { numberFormat, fileName, fileExt, fileSize, msToTime, secToTime, license } from '../dist';

describe('Format', () => {
  it('numberFormat', (done) => {
    assert.strictEqual(numberFormat(1234), '1,234');
    assert.strictEqual(numberFormat(12345678), '12,345,678');
    // @ts-ignore
    assert.strictEqual(numberFormat(null), '0');
    done();
  });

  it('fileName', (done) => {
    assert.strictEqual(fileName('C:\\Users\\test\\Desktop\\text.txt'), 'text');
    assert.strictEqual(fileName('/home/user/Desktop/example.txt'), 'example');
    assert.strictEqual(fileName('C:\\example.txt', true), 'example.txt');
    done();
  });

  it('fileExt', (done) => {
    assert.strictEqual(fileExt('C:\\Users\\test\\Desktop\\text.txt'), 'txt');
    assert.strictEqual(fileExt('hello.html'), 'html');
    assert.strictEqual(fileExt('this.is.file.PNG'), 'png');
    assert.strictEqual(fileExt('no-ext'), 'Unknown');
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

  it('secToTime', (done) => {
    assert.strictEqual(secToTime(60), '00:01:00');
    assert.strictEqual(secToTime(3800, false, '-'), '01-03-20');
    assert.strictEqual(secToTime(360000), '100:00:00');
    done();
  });

  it('license', (done) => {
    assert(license({ type: 'mit', author: 'example', yearStart: 2021 }));
    assert(license({ type: 'apache20', author: 'example', yearStart: 2021 }));
    done();
  });
});
