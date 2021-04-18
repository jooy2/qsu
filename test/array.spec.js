const assert = require('assert');
const {
  shuffle, setWithDefault, unique, setWithNumber,
} = require('../array');

describe('Array', () => {
  it('shuffle', (done) => {
    assert(shuffle([1, 2, 3, 4, 5, 6, 7, 8]));
    assert(shuffle([[1, 2], [3, 4], [5, 6], [7, 8]]));
    assert(shuffle([{ A: 1 }, { B: 2 }, { C: 3 }, { D: 4 }]));
    done();
  });

  it('setWithDefault', (done) => {
    assert(setWithDefault());
    assert(setWithDefault('test'));
    assert(setWithDefault('test', 10));
    assert(setWithDefault(100, 5));
    done();
  });

  it('unique', (done) => {
    assert.deepStrictEqual(unique([1, 1, 2, 2, 3]), [1, 2, 3]);
    assert.deepStrictEqual(unique(['1', '2', '3', '3', '4']), ['1', '2', '3', '4']);
    assert.deepStrictEqual(unique([1, '1', 1, 'a', 2, 'b']), [1, '1', 'a', 2, 'b']);
    assert.deepStrictEqual(unique([[1, 2], [1, 2], [2, 3], [2, 4]]), [[1, 2], [2, 3], [2, 4]]);
    done();
  });

  it('setWithNumber', (done) => {
    assert.deepStrictEqual(setWithNumber(1, 2), [1, 2]);
    assert.deepStrictEqual(setWithNumber(2, 1), null);
    assert.deepStrictEqual(setWithNumber(0, 5), [0, 1, 2, 3, 4, 5]);
    assert.deepStrictEqual(setWithNumber(1, 1), [1]);
    done();
  });
});
