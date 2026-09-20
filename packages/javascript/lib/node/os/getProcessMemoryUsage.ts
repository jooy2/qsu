import { memoryUsage } from 'node:process';
import { fileSizeFormat } from '../../format/fileSizeFormat.js';

export function getProcessMemoryUsage(): string {
	return fileSizeFormat(memoryUsage.rss(), 0, true);
}
