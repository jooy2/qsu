import { tmpdir } from 'node:os';

export function getTempDir(): string {
	return tmpdir();
}
