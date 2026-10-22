import { cwd } from 'node:process';
import { numRound } from '../../math/numRound.js';
import { diskSpace } from './_diskSpace.js';

export async function getDiskUsage(path: string = cwd(), decimals = 1): Promise<number> {
	const { total, used } = await diskSpace(path);

	if (!total) {
		return 0;
	}

	return numRound((used / total) * 100, decimals);
}
