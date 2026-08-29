import type { RetryOptions } from '../_types/global.js';
import { sleep } from './sleep.js';

export async function retry<T>(func: () => T | Promise<T>, options?: RetryOptions): Promise<T> {
	const times = options?.times ?? 3;
	const delay = options?.delay ?? 0;
	const backoff = options?.backoff ?? 1;

	if (times < 1) {
		throw new Error('`times` must be at least 1.');
	}

	let currentDelay = delay;
	let lastError: unknown;

	for (let attempt = 1; attempt <= times; attempt += 1) {
		try {
			return await func();
		} catch (error) {
			lastError = error;

			// The delay sits *between* attempts, so the final failure is reported without
			// waiting one more time for nothing.
			if (attempt < times) {
				if (currentDelay > 0) {
					await sleep(currentDelay);
				}

				currentDelay *= backoff;
			}
		}
	}

	throw lastError;
}
