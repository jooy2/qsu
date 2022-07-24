import assert from 'assert';
import _ from '../dist/index.js';

describe('Verify', () => {
  it('isEqual', (done) => {
    const val1 = 'abc';
    const val2 = 'abc';
    const val3 = 'abc';

    assert.strictEqual(_.isEqual(1, [1, 2, 3]), false);
    assert.strictEqual(_.isEqual('abc', [val1, val2, val3]), true);
    assert.strictEqual(_.isEqual('123', ['123', 123]), true);
    assert.strictEqual(_.isEqual(123, '123', 123), true);
    done();
  });

  it('isEmpty', (done) => {
    assert.strictEqual(_.isEmpty(''), true);
    assert.strictEqual(_.isEmpty('1234'), false);
    assert.strictEqual(_.isEmpty(1234), false);
    assert.strictEqual(_.isEmpty(1.234), false);
    assert.strictEqual(_.isEmpty(null), true);
    assert.strictEqual(_.isEmpty([]), true);
    assert.strictEqual(_.isEmpty([{}]), false);
    assert.strictEqual(_.isEmpty([[]]), false);
    assert.strictEqual(_.isEmpty(['1234']), false);
    assert.strictEqual(_.isEmpty({}), true);
    assert.strictEqual(_.isEmpty({ a: '1234' }), false);
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
    assert.strictEqual(_.contains('ABC', ['AB', 'C'], true), false);
    assert.strictEqual(_.contains('AB', ['AB', 'C', 'D'], true), true);
    done();
  });

  it('is2dArray', (done) => {
    assert.strictEqual(_.is2dArray([]), false);
    assert.strictEqual(_.is2dArray([[], []]), true);
    assert.strictEqual(_.is2dArray([{ a: 1 }, { b: 2 }]), false);
    assert.strictEqual(_.is2dArray([[1], [2]]), true);
    done();
  });

  it('between', (done) => {
    assert.strictEqual(_.between([1, 10], 1), false);
    assert.strictEqual(_.between([1, 10], 1, true), true);
    assert.strictEqual(_.between([10, 100], 11), true);
    done();
  });

  it('len', (done) => {
    assert.strictEqual(_.len('12345'), 5);
    assert.strictEqual(_.len(12345), 5);
    assert.strictEqual(_.len(() => '123'), 3);
    assert.strictEqual(_.len([1, 2, 3, 4]), 4);
    assert.strictEqual(_.len({ hello: 'world', lorem: 'ipsum' }), 2);
    assert.strictEqual(_.len([{ hello: 1, world: 2 }, { lorem: 3 }]), 2);
    done();
  });

  it('isBotAgent', (done) => {
    assert.strictEqual(_.isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html'), true);
    assert.strictEqual(_.isBotAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'), false);
    done();
  });
});
