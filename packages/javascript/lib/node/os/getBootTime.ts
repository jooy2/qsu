import { uptime } from 'node:os';

export function getBootTime(): Date {
	return new Date(Date.now() - uptime() * 1000);
}
