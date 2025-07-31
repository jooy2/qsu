import assert from 'assert';
import { describe, it } from 'node:test';
import { runCommand, getHostname, getMachineId, getSid } from '../dist/node';

describe('OS', () => {
	it('runCommand', async () => {
		assert.strictEqual(await runCommand('echo a'), 'a');
		assert.strictEqual(await runCommand('echo b'), 'b');
	});

	it('getHostname', async () => {
		const hostname = await getHostname();

		assert.match(hostname, /[a-zA-Z0-9]+/);
	});

	/*
	 * Sample Response:
	 * Windows: a642d9e1-6063-4da7-8ea8-2298f989d01d
	 * Linux: 5c6ee51d3e514eb4883e4373e320192c
	 * macOS: BAC04154-124A-56E1-BFEB-D6D94FE5DBC0
	 */
	it('getMachineId', async () => {
		const mId = await getMachineId();

		let regex;

		switch (process.platform) {
			case 'win32':
			case 'darwin':
			case 'freebsd':
				regex = /^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/;
				break;
			default:
				regex = /^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}/;
				break;
		}

		assert.match(mId, regex);
	});

	// Example: S-1-5-21-406418252-5582013529-1321253100-2001
	it('getSid', async () => {
		const { platform } = process;

		if (platform !== 'win32' && platform !== 'darwin') {
			return;
		}

		const sidResult = await getSid();

		assert.match(sidResult, /^S-1-[0-59]-\d{2}-\d{8,10}-\d{8,10}-\d{8,10}-[1-9]\d{1,9}/);
	});
});
