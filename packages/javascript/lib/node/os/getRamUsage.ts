import { freemem, totalmem } from 'node:os';
import { numRound } from '../../math/numRound.js';

export function getRamUsage(decimals = 1): number {
	const total = totalmem();

	if (!total) {
		return 0;
	}

	return numRound((Math.max(total - freemem(), 0) / total) * 100, decimals);
}
