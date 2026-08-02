import { cpus } from 'node:os';

export function getCpu(): string {
	return `${cpus()?.[0]?.model || 'Unknown'}`;
}
