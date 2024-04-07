import assert from 'assert';
import { setTimeout } from 'timers/promises';
import { sleep, funcTimes, debounce, arrWithDefault } from '../dist';

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

	it('debounce', (done) => {
		const debounceResult: boolean[] = [];
		const debounceFunc = debounce(() => {
			debounceResult.push(true);
		}, 5);
		const runningFunctions: Promise<boolean>[] = [];

		for (let i = 0; i < 100; i += 1) {
			let waitDelay: number;

			if (i === 25 || i === 50 || i === 75) {
				waitDelay = 10;
			} else {
				waitDelay = 1;
			}

			runningFunctions.push(
				new Promise((resolve) => {
					setTimeout(waitDelay * i).then(() => {
						debounceFunc();
						resolve(true);
					});
				})
			);
		}

		Promise.all(runningFunctions).then(() => {
			sleep(10).then(() => {
				assert.deepStrictEqual(debounceResult, arrWithDefault(true, 4));
				done();
			});
		});
	});
});
