const assert = require('assert');
const {
  empty, isUrl, contains, is2dArray,
} = require('../verify');

describe('Verify', () => {
  it('empty', (done) => {
    assert.strictEqual(empty(), true);
    assert.strictEqual(empty(''), true);
    assert.strictEqual(empty('1234'), false);
    assert.strictEqual(empty(1234), false);
    assert.strictEqual(empty(1.234), false);
    assert.strictEqual(empty(null), true);
    assert.strictEqual(empty([]), true);
    assert.strictEqual(empty([{}]), false);
    assert.strictEqual(empty([[]]), false);
    assert.strictEqual(empty(['1234']), false);
    assert.strictEqual(empty({}), true);
    assert.strictEqual(empty({ a: '1234' }), false);
    done();
  });

  it('isUrl', (done) => {
    assert.strictEqual(isUrl(''), false);
    assert.strictEqual(isUrl('https://'), false);
    assert.strictEqual(isUrl('www.google.com'), false);
    assert.strictEqual(isUrl('www.google.com', true), true);
    assert.strictEqual(isUrl('https://google.com'), true);
    assert.strictEqual(isUrl('https://google.com', true), true);
    assert.strictEqual(isUrl('https://google'), true);
    assert.strictEqual(isUrl('https://google', false, true), false);
    assert.strictEqual(isUrl('https://google.com?query=qsu'), true);
    done();
  });

  it('contains', (done) => {
    assert.strictEqual(contains('12345', '3'), true);
    assert.strictEqual(contains('12345', '10'), false);
    assert.strictEqual(contains('ABC', ['A']), true);
    assert.strictEqual(contains('ABC', ['A', 'B', 'C']), true);
    assert.strictEqual(contains('ABC', ['D', 'E', 'F']), false);
    done();
  });

  it('is2dArray', (done) => {
    assert.strictEqual(is2dArray([]), false);
    assert.strictEqual(is2dArray([[], []]), true);
    assert.strictEqual(is2dArray('A'), false);
    assert.strictEqual(is2dArray([{ a: 1 }, { b: 2 }]), false);
    assert.strictEqual(is2dArray([[1], [2]]), true);
    done();
  });
});
