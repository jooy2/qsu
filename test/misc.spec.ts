import assert from 'assert';
import { sleep, getPlatform } from '../dist';

describe('Misc', () => {
  it('sleep', (done) => {
    assert(sleep(100).then(() => done()));
  });

  it('getPlatform', (done) => {
    assert.strictEqual(getPlatform(), 'Windows' || 'macOS' || 'Linux');
    done();
  });
});
