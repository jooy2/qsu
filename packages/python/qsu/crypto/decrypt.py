import base64

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


def decrypt(
	str: str,
	secret: str,
	algorithm: str = 'aes-256-cbc',
	toBase64: bool = False,
) -> str:
	if not str or len(str) < 1:
		return ''

	arrStr = str.split(':')
	iv_part = arrStr.pop(0)
	enc_part = ':'.join(arrStr)

	if toBase64:
		iv = base64.b64decode(iv_part)
		enc = base64.b64decode(enc_part)
	else:
		iv = bytes.fromhex(iv_part)
		enc = bytes.fromhex(enc_part)

	cipher = Cipher(algorithms.AES(secret.encode('utf-8')), modes.CBC(iv))
	decryptor = cipher.decryptor()
	decrypted = decryptor.update(enc) + decryptor.finalize()

	# Remove PKCS7 padding.
	pad_len = decrypted[-1]
	decrypted = decrypted[:-pad_len]

	return decrypted.decode('utf-8')
