import assert from 'assert';
import { describe, it } from 'node:test';
import {
	encrypt,
	decrypt,
	md5Hash,
	sha1Hash,
	sha256Hash,
	sha512Hash,
	encodeBase64,
	decodeBase64,
	numberHash,
	objectId
} from '../dist/node';

describe('Encrypt', () => {
	const cryptoSecret = '12345678901234567890123456789012';

	it('encrypt', () => {
		assert(encrypt('test', cryptoSecret));
		assert(encrypt('test', cryptoSecret, 'aes-256-gcm', 16));
		assert(encrypt('test', cryptoSecret, 'aes-256-gcm', 16, true));
	});

	it('decrypt', () => {
		assert.strictEqual(
			decrypt('61ba43b65fc3fc2bdbd0d1ad8576344d:1831d7c37d12b3bf7ee73195d31af91b', cryptoSecret),
			'test'
		);
	});

	it('md5Hash', () => {
		assert.strictEqual(md5Hash('test'), '098f6bcd4621d373cade4e832627b4f6');
		assert.strictEqual(md5Hash('test', 'hex'), '098f6bcd4621d373cade4e832627b4f6');
		assert.strictEqual(md5Hash('test', 'base64'), 'CY9rzUYh03PK3k6DJie09g==');
		assert.strictEqual(md5Hash('test', 'base64url'), 'CY9rzUYh03PK3k6DJie09g');
		assert.strictEqual(md5Hash('test', 'binary'), "\t\x8FkÍF!ÓsÊÞN\x83&'´ö");
		assert.strictEqual(md5Hash('qsu-md5'), '94af002364e42b514badb41b870ceb04');
	});

	it('sha1Hash', () => {
		assert.strictEqual(sha1Hash('test'), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
		assert.strictEqual(sha1Hash('test', 'base64'), 'qUqP5cyxm6YcTAhz05Hph5gvu9M=');
		assert.strictEqual(sha1Hash('qsu-sha1'), 'd81bc7ffbaed53cc8094dd2fe70cd5d4588aa0b1');
	});

	it('sha256Hash', () => {
		assert.strictEqual(
			sha256Hash('test'),
			'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
		);
		assert.strictEqual(
			sha256Hash('test', 'base64'),
			'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='
		);
		assert.strictEqual(
			sha256Hash('qsu-sha256'),
			'c921e2216a342bad0a1b0dbe94027d69b3913f653a3878e3d5188a2c8551b51f'
		);
	});

	it('sha512Hash', () => {
		assert.strictEqual(
			sha512Hash('test'),
			'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
		);
		assert.strictEqual(
			sha512Hash('test', 'base64'),
			'7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w=='
		);
		assert.strictEqual(
			sha512Hash('qsu-sha512'),
			'22629d4da181d299e28abe986b55b066a3e2c062ccaab0f5d6f31be823f8f6b443d3d2a530ea2caf97cde89aacd1b5cbdddfd09758d05f1314414c6617ed5dc3'
		);
	});

	it('encodeBase64', () => {
		assert.strictEqual(encodeBase64('this is test'), 'dGhpcyBpcyB0ZXN0');
		assert.strictEqual(encodeBase64('1234567890Test'), 'MTIzNDU2Nzg5MFRlc3Q=');
	});

	it('decodeBase64', () => {
		assert.strictEqual(decodeBase64('dGhpcyBpcyB0ZXN0'), 'this is test');
		assert.strictEqual(decodeBase64('MTIzNDU2Nzg5MFRlc3Q='), '1234567890Test');
	});

	it('numberHash', () => {
		assert.strictEqual(numberHash(''), 0);
		assert.strictEqual(numberHash(' '), 32);
		assert.strictEqual(numberHash('abc'), 96354);
		assert.strictEqual(numberHash('Hello'), 69609650);
		assert.strictEqual(numberHash('hello'), 99162322);
		assert.strictEqual(numberHash('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(10000)), 285059024);
	});

	it('objectId', () => {
		assert.strictEqual(objectId().length, 24);
	});
});
