import { uptime } from 'node:os';
import { numberFormat } from '../../format/numberFormat.js';
import type { UptimeOptions } from '../../_types/global.js';

export function getSystemUptime(options?: UptimeOptions): number | string {
	let t = uptime();

	if (!t) {
		return 0;
	}

	if (options?.floor) {
		t = Math.floor(t);
	}

	return options?.format ? numberFormat(t) : t;
}
