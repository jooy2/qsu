import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { argv, execPath, exit } from 'node:process';
import { fileURLToPath } from 'node:url';

// `node --test` only learned to expand a glob pattern in v22, and only began
// matching TypeScript test files by default in the same release. Naming the files
// here runs the same suite on every version the package supports, under whichever
// shell npm happens to use.
const here = dirname(fileURLToPath(import.meta.url));

const files = readdirSync(here)
	.filter((name) => name.endsWith('.test.ts'))
	.sort()
	.map((name) => join(here, name));

if (files.length === 0) {
	console.error(`No test files found in ${here}`);
	exit(1);
}

const { status } = spawnSync(execPath, ['--import', 'tsx', '--test', ...argv.slice(2), ...files], {
	stdio: 'inherit'
});

exit(status ?? 1);
