const assert = require('assert');
const { sleep } = require('../misc');

describe('Misc', () => {
  it('sleep', (done) => {
    assert(sleep(100).then(() => done()));
  });
});
