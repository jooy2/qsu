import base64
import os

from cryptography.hazmat.primitives import padding

from ._cipher import (
	AEAD_MODES,
	BLOCK_SIZE_BITS,
	PADDED_MODES,
	buildCipher,
	parseAlgorithm,
)


def encrypt(
	str: str,
	secret: str,
	algorithm: str = 'aes-256-cbc',
	ivSize: int = 16,
	toBase64: bool = False,
) -> str:
	if not str or len(str) < 1:
		return ''

	key, modeName = parseAlgorithm(algorithm, secret)
	iv = os.urandom(ivSize)
	encryptor = buildCipher(key, modeName, iv).encryptor()

	data = str.encode('utf-8')

	if modeName in PADDED_MODES:
		padder = padding.PKCS7(BLOCK_SIZE_BITS).padder()
		data = padder.update(data) + padder.finalize()

	enc = encryptor.update(data) + encryptor.finalize()

	def encode(value):
		return base64.b64encode(value).decode('ascii') if toBase64 else value.hex()

	# AEAD modes need the authentication tag to decrypt, so it is carried in the middle.
	if modeName in AEAD_MODES:
		return f'{encode(iv)}:{encode(encryptor.tag)}:{encode(enc)}'

	return f'{encode(iv)}:{encode(enc)}'
