const assert = require('assert');
const _ = require('../misc');

describe('Misc', () => {
  it('sleep', (done) => {
    assert(_.sleep(100).then(() => done()));
  });
});
