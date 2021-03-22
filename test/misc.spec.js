const assert = require('assert');
const misc = require('../misc');

describe('Misc', () => {
  it('sleep', (done) => {
    assert(misc.sleep(100).then(() => done()));
  });
});
