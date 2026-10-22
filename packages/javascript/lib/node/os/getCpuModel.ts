import { cpus } from 'node:os';

export function getCpuModel(): string {
	return `${cpus()?.[0]?.model || 'Unknown'}`;
}
