const assert = require('assert');
const {
  empty, isUrl, contains, is2dArray, between, length, isBotAgent,
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

  it('between', (done) => {
    assert.strictEqual(between(1, [1, 10]), false);
    assert.strictEqual(between(1, [1, 10], true), true);
    assert.strictEqual(between(11, [10, 100]), true);
    done();
  });

  it('length', (done) => {
    assert.strictEqual(length('12345'), 5);
    assert.strictEqual(length(12345), 5);
    assert.strictEqual(length(() => '123'), 3);
    assert.strictEqual(length([1, 2, 3, 4]), 4);
    assert.strictEqual(length({ hello: 'world', lorem: 'ipsum' }), 2);
    assert.strictEqual(length([{ hello: 1, world: 2 }, { lorem: 3 }]), 2);
    done();
  });

  it('isBotAgent', (done) => {
    assert.strictEqual(isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html'), true);
    assert.strictEqual(isBotAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'), false);
    done();
  });
});
