import { uptime } from 'node:os';
import { numberFormat } from '../../format/numberFormat.js';
import type { GetUptimeOption } from '../../_types/global.js';

export function getSystemUptime(opt?: GetUptimeOption): number | string {
	let t = uptime();

	if (!t) {
		return 0;
	}

	if (opt?.floor) {
		t = Math.floor(t);
	}

	return opt?.format ? numberFormat(t) : t;
}
