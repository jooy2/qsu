const assert = require('assert');
const _ = require('../string');

describe('String', () => {
  it('removeSpecialChar', (done) => {
    assert.strictEqual(_.removeSpecialChar('1　2！3☆4＠5＋6─🌍'), '123456');
    assert.strictEqual(_.removeSpecialChar('Hello, World!'), 'HelloWorld');
    assert.strictEqual(_.removeSpecialChar('12 34-56,78=90'), '1234567890');
    assert.strictEqual(_.removeSpecialChar('ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'), 'ABC가나다ㄱㄴㄷㅏㅑㅓ天地人');
    done();
  });

  it('removeNewLine', (done) => {
    assert.strictEqual(_.removeNewLine(`te
st`), 'test');
    assert.strictEqual(_.removeNewLine('te\rst'), 'test');
    assert.strictEqual(_.removeNewLine('te\nst'), 'test');
    assert.strictEqual(_.removeNewLine('te\r\nst'), 'test');
    assert.strictEqual(_.removeNewLine('te\r\nst', '|'), 'te|st');
    assert.strictEqual(_.removeNewLine('t\ne\r\ns\rt', '-'), 't-e-s-t');
    done();
  });

  it('capitalizeFirst', (done) => {
    assert.strictEqual(_.capitalizeFirst('t'), 'T');
    assert.strictEqual(_.capitalizeFirst('test'), 'Test');
    assert.strictEqual(_.capitalizeFirst('tEST'), 'TEST');
    done();
  });

  it('count', (done) => {
    assert.strictEqual(_.count('hello', 'l'), 2);
    assert.strictEqual(_.count('abcdABCD', 'a'), 1);
    assert.strictEqual(_.count('aaaaaa', 'a'), 6);
    assert.strictEqual(_.count('hello', 'll'), 1);
    done();
  });

  it('shuffle', (done) => {
    assert(_.shuffle('hi'));
    assert(_.shuffle('abc def ghi'));
    done();
  });

  it('createRandomCode', (done) => {
    assert(_.createRandom());
    assert(_.createRandom(5));
    assert(_.createRandom(10));
    done();
  });

  it('hideRandom', (done) => {
    assert(_.hideRandom('test'));
    assert(_.hideRandom('test', 2));
    assert(_.hideRandom('test', 2, '#'));
    done();
  });

  it('truncate', (done) => {
    assert.strictEqual(_.truncate('test', 2), 'te');
    assert.strictEqual(_.truncate('test', 1, '...'), 't...');
    done();
  });

  it('encrypt', (done) => {
    assert(_.encrypt('test', '12345678901234567890123456789012'));
    assert(_.encrypt('test', '12345678901234567890123456789012', 'aes-256-gcm', 16));
    done();
  });

  it('decrypt', (done) => {
    assert.strictEqual(_.decrypt('61ba43b65fc3fc2bdbd0d1ad8576344d:1831d7c37d12b3bf7ee73195d31af91b', '12345678901234567890123456789012'), 'test');
    done();
  });

  it('md5', (done) => {
    assert.strictEqual(_.md5('test'), '098f6bcd4621d373cade4e832627b4f6');
    assert.strictEqual(_.md5('qsu-md5'), '94af002364e42b514badb41b870ceb04');
    done();
  });
});
