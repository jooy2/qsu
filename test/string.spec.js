const assert = require('assert');
const { removeSpecialChar } = require('../string');

describe('String', () => {
  it('removeSpecialChar', (done) => {
    assert.strictEqual(removeSpecialChar('1　2！3☆4＠5＋6─🌍'), '123456');
    assert.strictEqual(removeSpecialChar('Hello, World!'), 'HelloWorld');
    assert.strictEqual(removeSpecialChar('12 34-56,78=90'), '1234567890');
    assert.strictEqual(removeSpecialChar('ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'), 'ABC가나다ㄱㄴㄷㅏㅑㅓ天地人');
    done();
  });
});
