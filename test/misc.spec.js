const assert = require('assert');
const { sleep, takes } = require('../misc');

describe('Misc', () => {
  it('sleep', (done) => {
    assert(sleep(100).then(() => done()));
  });

  const makeArr = (len = 1000) => {
    const arr = [];
    for (let i = 0; i < len; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  it('takes', (done) => {
    assert(takes(makeArr) < 10);
    assert(takes(() => makeArr(1000)) < 10);
    assert(takes(() => makeArr(1000), true) < 10);
    done();
  });
});
