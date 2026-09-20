from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

try:
	# Both were moved here, and reading them from their old home warns and is due to
	# stop working. The fallback is for a `cryptography` older than that move, where
	# the old home is the only one and does not warn.
	from cryptography.hazmat.decrepit.ciphers.modes import CFB, OFB
except ImportError:  # pragma: no cover - depends on the installed version
	from cryptography.hazmat.primitives.ciphers.modes import CFB, OFB

# AEAD modes produce an authentication tag that is required to decrypt, so the tag has
# to be carried alongside the ciphertext.
AEAD_MODES = ('gcm',)

# Block modes that need the plaintext padded to a whole number of blocks.
PADDED_MODES = ('cbc',)

BLOCK_SIZE_BITS = 128


def parseAlgorithm(algorithm: str, secret: str):
	"""Split an `aes-<bits>-<mode>` name and validate the key length against it.

	The mode used to be ignored entirely, so every algorithm silently produced AES-CBC.
	"""
	parts = algorithm.lower().split('-')

	if len(parts) != 3 or parts[0] != 'aes' or not parts[1].isdigit():
		raise ValueError(f'Unsupported algorithm: {algorithm}')

	key = secret.encode('utf-8')

	if len(key) * 8 != int(parts[1]):
		raise ValueError('Invalid key length')

	return key, parts[2]


def buildCipher(key: bytes, modeName: str, iv: bytes, tag=None) -> Cipher:
	mode: modes.Mode

	if modeName == 'cbc':
		mode = modes.CBC(iv)
	elif modeName == 'gcm':
		mode = modes.GCM(iv, tag)
	elif modeName == 'ctr':
		mode = modes.CTR(iv)
	elif modeName == 'ofb':
		mode = OFB(iv)
	elif modeName == 'cfb':
		mode = CFB(iv)
	else:
		raise ValueError(f'Unsupported algorithm mode: {modeName}')

	return Cipher(algorithms.AES(key), mode)
