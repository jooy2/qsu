const assert = require('assert');
const {
  removeSpecialChar, removeNewLine, capitalizeFirst, count, shuffle, createRandom, hideRandom,
} = require('../string');

describe('String', () => {
  it('removeSpecialChar', (done) => {
    assert.strictEqual(removeSpecialChar('1　2！3☆4＠5＋6─🌍'), '123456');
    assert.strictEqual(removeSpecialChar('Hello, World!'), 'HelloWorld');
    assert.strictEqual(removeSpecialChar('12 34-56,78=90'), '1234567890');
    assert.strictEqual(removeSpecialChar('ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'), 'ABC가나다ㄱㄴㄷㅏㅑㅓ天地人');
    done();
  });

  it('removeNewLine', (done) => {
    assert.strictEqual(removeNewLine(`te
st`), 'test');
    assert.strictEqual(removeNewLine('te\rst'), 'test');
    assert.strictEqual(removeNewLine('te\nst'), 'test');
    assert.strictEqual(removeNewLine('te\r\nst'), 'test');
    assert.strictEqual(removeNewLine('te\r\nst', '|'), 'te|st');
    assert.strictEqual(removeNewLine('t\ne\r\ns\rt', '-'), 't-e-s-t');
    done();
  });

  it('capitalizeFirst', (done) => {
    assert.strictEqual(capitalizeFirst('t'), 'T');
    assert.strictEqual(capitalizeFirst('test'), 'Test');
    assert.strictEqual(capitalizeFirst('tEST'), 'TEST');
    done();
  });

  it('count', (done) => {
    assert.strictEqual(count('hello', 'l'), 2);
    assert.strictEqual(count('abcdABCD', 'a'), 1);
    assert.strictEqual(count('aaaaaa', 'a'), 6);
    assert.strictEqual(count('hello', 'll'), 1);
    done();
  });

  it('shuffle', (done) => {
    assert(shuffle('hi'));
    assert(shuffle('abc def ghi'));
    done();
  });

  it('createRandomCode', (done) => {
    assert(createRandom());
    assert(createRandom(5));
    assert(createRandom(10));
    done();
  });

  it('hideRandom', (done) => {
    assert(hideRandom('test'));
    assert(hideRandom('test', 2));
    assert(hideRandom('test', 2, '#'));
    done();
  });
});
