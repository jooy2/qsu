import { homedir } from 'node:os';

export function getHomeDir(): string {
	return homedir();
}
