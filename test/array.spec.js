const assert = require('assert');
const { shuffle, setWithDefault } = require('../array');

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
});
