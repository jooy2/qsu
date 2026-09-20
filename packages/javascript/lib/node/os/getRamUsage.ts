import { freemem, totalmem } from 'node:os';
import { round } from '../../math/round.js';

export function getRamUsage(decimals = 1): number {
	const total = totalmem();

	if (!total) {
		return 0;
	}

	return round((Math.max(total - freemem(), 0) / total) * 100, decimals);
}
