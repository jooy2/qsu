import assert from 'assert';
import { sleep } from '../dist';

describe('Misc', () => {
  it('sleep', (done) => {
    assert(sleep(100).then(() => done()));
  });
});
