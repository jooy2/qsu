import { release } from 'node:os';

export function getKernelVersion(): string {
	return release() || 'Unknown';
}
