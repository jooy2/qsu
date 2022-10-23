import assert from 'assert';
import { sleep, getPlatform, contains } from '../dist';

describe('Misc', () => {
  it('sleep', (done) => {
    assert(sleep(100).then(() => done()));
  });

  it('getPlatform', (done) => {
    assert(contains(getPlatform(), ['Windows', 'macOS', 'Linux']));
    done();
  });
});
