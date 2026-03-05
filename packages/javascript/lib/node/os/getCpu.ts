import { cpus } from 'os';

export function getCpu(): string {
	return `${cpus()?.[0]?.model || 'Unknown'}`;
}
