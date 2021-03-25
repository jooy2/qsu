const assert = require('assert');
const { removeSpecialChar, removeNewLine } = require('../string');

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
});
