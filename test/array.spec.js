const assert = require('assert');
const _ = require('../array');

describe('Array', () => {
  it('shuffle', (done) => {
    assert(_.shuffle([1, 2, 3, 4, 5, 6, 7, 8]));
    assert(_.shuffle([[1, 2], [3, 4], [5, 6], [7, 8]]));
    assert(_.shuffle([{ A: 1 }, { B: 2 }, { C: 3 }, { D: 4 }]));
    done();
  });

  it('setWithDefault', (done) => {
    assert(_.setWithDefault());
    assert(_.setWithDefault('test'));
    assert(_.setWithDefault('test', 10));
    assert(_.setWithDefault(100, 5));
    done();
  });

  it('unique', (done) => {
    assert.deepStrictEqual(_.unique([1, 1, 2, 2, 3]), [1, 2, 3]);
    assert.deepStrictEqual(_.unique(['1', '2', '3', '3', '4']), ['1', '2', '3', '4']);
    assert.deepStrictEqual(_.unique([1, '1', 1, 'a', 2, 'b']), [1, '1', 'a', 2, 'b']);
    assert.deepStrictEqual(_.unique([[1, 2], [1, 2], [2, 3], [2, 4]]), [[1, 2], [2, 3], [2, 4]]);
    done();
  });

  it('setWithNumber', (done) => {
    assert.deepStrictEqual(_.setWithNumber(1, 2), [1, 2]);
    assert.deepStrictEqual(_.setWithNumber(2, 1), null);
    assert.deepStrictEqual(_.setWithNumber(0, 5), [0, 1, 2, 3, 4, 5]);
    assert.deepStrictEqual(_.setWithNumber(1, 1), [1]);
    done();
  });
});
