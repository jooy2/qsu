import assert from 'assert';
import { describe, it } from 'node:test';
import { setTimeout } from 'timers/promises';
import { sleep, funcTimes, debounce, arrWithDefault, throttle } from '../dist';
import { logBox } from '../dist/node';

describe('Misc', () => {
	it('sleep', async () => {
		let result = false;
		await sleep(100).then(() => {
			result = true;
		});
		assert.equal(result, true);
	});

	it('logBox', async () => {
		logBox([1, 2, 3, 4, 5]);
	});

	it('funcTimes', () => {
		const sayHello = (str?: string): string => `Hello${str || ''}`;

		assert.deepStrictEqual(funcTimes(2, sayHello), ['Hello', 'Hello']);
		assert.deepStrictEqual(funcTimes(3, sayHello()), ['Hello', 'Hello', 'Hello']);
		assert.deepStrictEqual(
			funcTimes(4, () => sayHello('!')),
			['Hello!', 'Hello!', 'Hello!', 'Hello!']
		);
	});

	it('debounce', () => {
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
			});
		});
	});

	it('throttle', async () => {
		const calls: number[] = [];
		const throttled = throttle((value: number) => calls.push(value), 30);

		// The leading edge fires straight away; the rest collapse into one trailing call
		// carrying the most recent arguments.
		throttled(1);
		throttled(2);
		throttled(3);
		assert.deepStrictEqual(calls, [1]);

		await sleep(80);
		assert.deepStrictEqual(calls, [1, 3]);
	});

	it('throttle (leading: false)', async () => {
		const calls: number[] = [];
		const throttled = throttle((value: number) => calls.push(value), 30, { leading: false });

		throttled(1);
		throttled(2);
		assert.deepStrictEqual(calls, []);

		await sleep(80);
		assert.deepStrictEqual(calls, [2]);
	});

	it('throttle (trailing: false)', async () => {
		const calls: number[] = [];
		const throttled = throttle((value: number) => calls.push(value), 30, { trailing: false });

		throttled(1);
		throttled(2);

		await sleep(80);
		assert.deepStrictEqual(calls, [1]);
	});
});
