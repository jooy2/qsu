import base64

from cryptography.hazmat.primitives import padding

from ._cipher import (
	AEAD_MODES,
	BLOCK_SIZE_BITS,
	PADDED_MODES,
	buildCipher,
	parseAlgorithm,
)


def decrypt(
	str: str,
	secret: str,
	algorithm: str = 'aes-256-cbc',
	toBase64: bool = False,
) -> str:
	if not str or len(str) < 1:
		return ''

	key, modeName = parseAlgorithm(algorithm, secret)
	isAead = modeName in AEAD_MODES
	arrStr = str.split(':')

	if len(arrStr) < (3 if isAead else 2):
		raise ValueError(
			'`str` must be in the `iv:authTag:encrypted` format returned by `encrypt`.'
			if isAead
			else '`str` must be in the `iv:encrypted` format returned by `encrypt`.'
		)

	def decode(value):
		return base64.b64decode(value) if toBase64 else bytes.fromhex(value)

	iv = decode(arrStr.pop(0))
	tag = decode(arrStr.pop(0)) if isAead else None
	enc = decode(':'.join(arrStr))

	decryptor = buildCipher(key, modeName, iv, tag).decryptor()
	decrypted = decryptor.update(enc) + decryptor.finalize()

	if modeName in PADDED_MODES:
		# Let PKCS7 validate the padding. Reading the last byte and slicing by it accepted
		# any garbage, so decrypting with a wrong key returned '' instead of failing.
		unpadder = padding.PKCS7(BLOCK_SIZE_BITS).unpadder()
		decrypted = unpadder.update(decrypted) + unpadder.finalize()

	return decrypted.decode('utf-8')
