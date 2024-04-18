import assert from 'assert';
import {
	encrypt,
	decrypt,
	md5,
	sha1,
	sha256,
	encodeBase64,
	decodeBase64,
	strToNumberHash,
	objectId
} from '../dist';

describe('Crypto', () => {
	it('encrypt', (done) => {
		assert(encrypt('test', '12345678901234567890123456789012'));
		assert(encrypt('test', '12345678901234567890123456789012', 'aes-256-gcm', 16));
		assert(encrypt('test', '12345678901234567890123456789012', 'aes-256-gcm', 16, true));
		done();
	});

	it('decrypt', (done) => {
		assert.strictEqual(
			decrypt(
				'61ba43b65fc3fc2bdbd0d1ad8576344d:1831d7c37d12b3bf7ee73195d31af91b',
				'12345678901234567890123456789012'
			),
			'test'
		);
		done();
	});

	it('md5', (done) => {
		assert.strictEqual(md5('test'), '098f6bcd4621d373cade4e832627b4f6');
		assert.strictEqual(md5('qsu-md5'), '94af002364e42b514badb41b870ceb04');
		done();
	});

	it('sha1', (done) => {
		assert.strictEqual(sha1('test'), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
		assert.strictEqual(sha1('qsu-md5'), 'e5c5dc3b2be3542475671d460f906c3b176bb5bf');
		done();
	});

	it('sha256', (done) => {
		assert.strictEqual(
			sha256('test'),
			'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
		);
		assert.strictEqual(
			sha256('qsu-md5'),
			'8c4cfec3ec79dc572958ea7f0e3cfd24b90d174969df9a4773b37b68498871ed'
		);
		done();
	});

	it('encodeBase64', (done) => {
		assert.strictEqual(encodeBase64('this is test'), 'dGhpcyBpcyB0ZXN0');
		assert.strictEqual(encodeBase64('1234567890Test'), 'MTIzNDU2Nzg5MFRlc3Q=');
		done();
	});

	it('decodeBase64', (done) => {
		assert.strictEqual(decodeBase64('dGhpcyBpcyB0ZXN0'), 'this is test');
		assert.strictEqual(decodeBase64('MTIzNDU2Nzg5MFRlc3Q='), '1234567890Test');
		done();
	});

	it('strToNumberHash', (done) => {
		assert.strictEqual(strToNumberHash(''), 0);
		assert.strictEqual(strToNumberHash(' '), 32);
		assert.strictEqual(strToNumberHash('abc'), 96354);
		assert.strictEqual(strToNumberHash('Hello'), 69609650);
		assert.strictEqual(strToNumberHash('hello'), 99162322);
		assert.strictEqual(strToNumberHash('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(10000)), 285059024);
		done();
	});

	it('objectId', (done) => {
		assert.strictEqual(objectId().length, 24);
		done();
	});
});
