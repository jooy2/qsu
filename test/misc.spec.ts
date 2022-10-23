import assert from 'assert';
import { sleep, funcTimes, getPlatform, contains } from '../dist';

describe('Misc', () => {
  it('sleep', (done) => {
    assert(sleep(100).then(() => done()));
  });

  it('funcTimes', (done) => {
    const sayHello = (str?: string): string => `Hello${str || ''}`;

    assert.deepStrictEqual(funcTimes(2, sayHello), ['Hello', 'Hello']);
    assert.deepStrictEqual(funcTimes(3, sayHello()), ['Hello', 'Hello', 'Hello']);
    assert.deepStrictEqual(
      funcTimes(4, () => sayHello('!')),
      ['Hello!', 'Hello!', 'Hello!', 'Hello!']
    );
    done();
  });

  it('getPlatform', (done) => {
    assert(contains(getPlatform(), ['Windows', 'macOS', 'Linux']));
    done();
  });
});
