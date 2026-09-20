import { availableParallelism } from 'node:os';

export function getCpuCount(): number {
	// The cores this process may actually use, which a CPU affinity mask narrows.
	// Counting the entries of `cpus()` would report every core on the machine.
	return availableParallelism() || 1;
}
