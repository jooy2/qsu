import base64
import os

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


def encrypt(
	str: str,
	secret: str,
	algorithm: str = 'aes-256-cbc',
	ivSize: int = 16,
	toBase64: bool = False,
) -> str:
	if not str or len(str) < 1:
		return ''

	iv = os.urandom(ivSize)
	cipher = Cipher(algorithms.AES(secret.encode('utf-8')), modes.CBC(iv))
	encryptor = cipher.encryptor()

	data = str.encode('utf-8')
	block_size = 16
	pad_len = block_size - (len(data) % block_size)
	padded = data + bytes([pad_len]) * pad_len

	enc = encryptor.update(padded) + encryptor.finalize()

	if toBase64:
		iv_str = base64.b64encode(iv).decode('ascii')
		enc_str = base64.b64encode(enc).decode('ascii')
	else:
		iv_str = iv.hex()
		enc_str = enc.hex()

	return f'{iv_str}:{enc_str}'
