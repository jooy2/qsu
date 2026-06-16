from qsu.crypto import (
	decodeBase64,
	decrypt,
	encodeBase64,
	encrypt,
	md5Hash,
	numberHash,
	objectId,
	sha1Hash,
	sha256Hash,
	sha512Hash,
)

cryptoSecret = '12345678901234567890123456789012'


def test_encrypt():
	assert encrypt('test', cryptoSecret)
	# Round-trip and format checks.
	enc = encrypt('test', cryptoSecret)
	assert ':' in enc
	assert decrypt(enc, cryptoSecret) == 'test'

	enc_b64 = encrypt('test', cryptoSecret, 'aes-256-cbc', 16, True)
	assert ':' in enc_b64
	assert decrypt(enc_b64, cryptoSecret, 'aes-256-cbc', True) == 'test'

	assert encrypt('', cryptoSecret) == ''


def test_decrypt():
	assert (
		decrypt(
			'61ba43b65fc3fc2bdbd0d1ad8576344d:1831d7c37d12b3bf7ee73195d31af91b',
			cryptoSecret,
		)
		== 'test'
	)
	assert decrypt('', cryptoSecret) == ''


def test_md5Hash():
	assert md5Hash('test') == '098f6bcd4621d373cade4e832627b4f6'
	assert md5Hash('test', 'hex') == '098f6bcd4621d373cade4e832627b4f6'
	assert md5Hash('test', 'base64') == 'CY9rzUYh03PK3k6DJie09g=='
	assert md5Hash('test', 'base64url') == 'CY9rzUYh03PK3k6DJie09g'
	assert md5Hash('test', 'binary') == bytes.fromhex(
		'098f6bcd4621d373cade4e832627b4f6'
	).decode('latin-1')
	assert md5Hash('qsu-md5') == '94af002364e42b514badb41b870ceb04'


def test_sha1Hash():
	assert sha1Hash('test') == 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
	assert sha1Hash('test', 'base64') == 'qUqP5cyxm6YcTAhz05Hph5gvu9M='
	assert sha1Hash('qsu-sha1') == 'd81bc7ffbaed53cc8094dd2fe70cd5d4588aa0b1'


def test_sha256Hash():
	assert (
		sha256Hash('test')
		== '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
	)
	assert sha256Hash('test', 'base64') == 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='
	assert (
		sha256Hash('qsu-sha256')
		== 'c921e2216a342bad0a1b0dbe94027d69b3913f653a3878e3d5188a2c8551b51f'
	)


def test_sha512Hash():
	assert sha512Hash('test') == (
		'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db2'
		'7ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
	)
	assert sha512Hash('test', 'base64') == (
		'7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1ns'
		'UNzLDBMxfqa2Ob1f1ACio/w=='
	)
	assert sha512Hash('qsu-sha512') == (
		'22629d4da181d299e28abe986b55b066a3e2c062ccaab0f5d6f31be823f8f6b4'
		'43d3d2a530ea2caf97cde89aacd1b5cbdddfd09758d05f1314414c6617ed5dc3'
	)


def test_encodeBase64():
	assert encodeBase64('this is test') == 'dGhpcyBpcyB0ZXN0'
	assert encodeBase64('1234567890Test') == 'MTIzNDU2Nzg5MFRlc3Q='


def test_decodeBase64():
	assert decodeBase64('dGhpcyBpcyB0ZXN0') == 'this is test'
	assert decodeBase64('MTIzNDU2Nzg5MFRlc3Q=') == '1234567890Test'


def test_numberHash():
	assert numberHash('') == 0
	assert numberHash(' ') == 32
	assert numberHash('abc') == 96354
	assert numberHash('Hello') == 69609650
	assert numberHash('hello') == 99162322
	assert numberHash('ABCDEFGHIJKLMNOPQRSTUVWXYZ' * 10000) == 285059024


def test_objectId():
	assert len(objectId()) == 24
