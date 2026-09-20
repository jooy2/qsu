import { cpus } from 'node:os';
import { round } from '../../math/round.js';
import { sleep } from '../../misc/sleep.js';

export async function getCpuUsage(interval = 100, decimals = 1): Promise<number> {
	// Nothing can be measured over no time at all. Sampling anyway would answer
	// with whatever the counters happened to do while the call turned around.
	if (interval <= 0) {
		return 0;
	}

	const before = cpuTicks();

	await sleep(interval);

	const after = cpuTicks();
	const total = after.total - before.total;
	const idle = after.idle - before.idle;

	if (total <= 0) {
		return 0;
	}

	return round((Math.max(total - idle, 0) / total) * 100, decimals);
}

// Processor time since boot, summed over every core. The units mean nothing on
// their own; two readings a moment apart are what says how busy it was between.
function cpuTicks(): { total: number; idle: number } {
	let total = 0;
	let idle = 0;

	for (const core of cpus()) {
		for (const value of Object.values(core.times)) {
			total += value;
		}

		idle += core.times.idle;
	}

	return { total, idle };
}
