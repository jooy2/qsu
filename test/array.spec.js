import assert from 'assert';
import _ from '../dist/index.js';

describe('Array', () => {
  it('arrShuffle', (done) => {
    assert(_.arrShuffle([1, 2, 3, 4, 5, 6, 7, 8]));
    assert(_.arrShuffle([[1, 2], [3, 4], [5, 6], [7, 8]]));
    assert(_.arrShuffle([{ A: 1 }, { B: 2 }, { C: 3 }, { D: 4 }]));
    done();
  });

  it('arrWithDefault', (done) => {
    assert(_.arrWithDefault('test'));
    assert(_.arrWithDefault('test', 10));
    assert(_.arrWithDefault(100, 5));
    done();
  });

  it('arrUnique', (done) => {
    assert.deepStrictEqual(_.arrUnique([1, 1, 2, 2, 3]), [1, 2, 3]);
    assert.deepStrictEqual(_.arrUnique(['1', '2', '3', '3', '4']), ['1', '2', '3', '4']);
    assert.deepStrictEqual(_.arrUnique([1, '1', 1, 'a', 2, 'b']), [1, '1', 'a', 2, 'b']);
    assert.deepStrictEqual(_.arrUnique([[1, 2], [1, 2], [2, 3], [2, 4]]), [[1, 2], [2, 3], [2, 4]]);
    done();
  });

  it('arrWithNumber', (done) => {
    assert.deepStrictEqual(_.arrWithNumber(1, 2), [1, 2]);
    assert.throws(() => _.arrWithNumber(2, 1));
    assert.deepStrictEqual(_.arrWithNumber(0, 5), [0, 1, 2, 3, 4, 5]);
    assert.deepStrictEqual(_.arrWithNumber(1, 1), [1]);
    done();
  });

  it('average', (done) => {
    assert.deepStrictEqual(_.average([1, 3, 5, 7, 9]), 5);
    assert.deepStrictEqual(_.average([1, 5, 15, 50]), 17.75);
    assert.deepStrictEqual(_.average([5, -5]), 0);
    done();
  });

  it('arrMove', (done) => {
    assert.deepStrictEqual(_.arrMove([1, 3, 5, 7, 9], 0, 3), [3, 5, 7, 1, 9]);
    assert.deepStrictEqual(_.arrMove([5, 10, 15], 1, 2), [5, 15, 10]);
    assert.deepStrictEqual(_.arrMove([5, 10, 15], 1, 1), [5, 10, 15]);
    done();
  });
});
