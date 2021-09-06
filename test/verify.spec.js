const assert = require('assert');
const _ = require('../verify');

describe('Verify', () => {
  it('empty', (done) => {
    assert.strictEqual(_.empty(''), true);
    assert.strictEqual(_.empty('1234'), false);
    assert.strictEqual(_.empty(1234), false);
    assert.strictEqual(_.empty(1.234), false);
    assert.strictEqual(_.empty(null), true);
    assert.strictEqual(_.empty([]), true);
    assert.strictEqual(_.empty([{}]), false);
    assert.strictEqual(_.empty([[]]), false);
    assert.strictEqual(_.empty(['1234']), false);
    assert.strictEqual(_.empty({}), true);
    assert.strictEqual(_.empty({ a: '1234' }), false);
    done();
  });

  it('isUrl', (done) => {
    assert.strictEqual(_.isUrl(''), false);
    assert.strictEqual(_.isUrl('https://'), false);
    assert.strictEqual(_.isUrl('www.google.com'), false);
    assert.strictEqual(_.isUrl('www.google.com', true), true);
    assert.strictEqual(_.isUrl('https://google.com'), true);
    assert.strictEqual(_.isUrl('https://google.com', true), true);
    assert.strictEqual(_.isUrl('https://google'), true);
    assert.strictEqual(_.isUrl('https://google', false, true), false);
    assert.strictEqual(_.isUrl('https://google.com?query=qsu'), true);
    done();
  });

  it('contains', (done) => {
    assert.strictEqual(_.contains('12345', '3'), true);
    assert.strictEqual(_.contains('12345', '10'), false);
    assert.strictEqual(_.contains('ABC', ['A', 'B', 'C']), true);
    assert.strictEqual(_.contains('ABC', ['D', 'E', 'F']), false);
    done();
  });

  it('is2dArray', (done) => {
    assert.strictEqual(_.is2dArray([]), false);
    assert.strictEqual(_.is2dArray([[], []]), true);
    assert.strictEqual(_.is2dArray('A'), false);
    assert.strictEqual(_.is2dArray([{ a: 1 }, { b: 2 }]), false);
    assert.strictEqual(_.is2dArray([[1], [2]]), true);
    done();
  });

  it('between', (done) => {
    assert.strictEqual(_.between(1, [1, 10]), false);
    assert.strictEqual(_.between(1, [1, 10], true), true);
    assert.strictEqual(_.between(11, [10, 100]), true);
    done();
  });

  it('length', (done) => {
    assert.strictEqual(_.length('12345'), 5);
    assert.strictEqual(_.length(12345), 5);
    assert.strictEqual(_.length(() => '123'), 3);
    assert.strictEqual(_.length([1, 2, 3, 4]), 4);
    assert.strictEqual(_.length({ hello: 'world', lorem: 'ipsum' }), 2);
    assert.strictEqual(_.length([{ hello: 1, world: 2 }, { lorem: 3 }]), 2);
    done();
  });

  it('isBotAgent', (done) => {
    assert.strictEqual(_.isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html'), true);
    assert.strictEqual(_.isBotAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'), false);
    done();
  });
});
