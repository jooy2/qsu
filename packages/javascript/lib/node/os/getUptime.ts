import { numberFormat } from '../../format/numberFormat.js';
import { GetUptimeOption } from '../../_types/global';

export function getUptime(opt?: GetUptimeOption): number | string {
	let t = process?.uptime();

	if (!t) {
		return 0;
	}

	if (opt?.floor) {
		t = Math.floor(t);
	}

	return opt?.format ? numberFormat(t) : t;
}
