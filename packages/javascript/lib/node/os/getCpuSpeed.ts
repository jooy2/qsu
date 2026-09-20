import { cpus } from 'node:os';

export function getCpuSpeed(): number {
	return cpus()?.[0]?.speed || 0;
}
