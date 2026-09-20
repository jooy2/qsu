import { arch } from 'node:os';

export function getArch(): string {
	return arch();
}
