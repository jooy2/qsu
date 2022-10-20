import assert from 'assert';
import _ from '../dist/index.js';

describe('Misc', () => {
  it('sleep', (done) => {
    assert(_.sleep(100).then(() => done()));
  });
});
