import base64
import hashlib
from typing import Optional


def sha1Hash(str: str, encoding: Optional[str] = None) -> str:
	digest = hashlib.sha1(str.encode('utf-8')).digest()
	enc = encoding or 'hex'

	if enc == 'hex':
		return digest.hex()
	if enc == 'base64':
		return base64.b64encode(digest).decode('ascii')
	if enc == 'base64url':
		return base64.urlsafe_b64encode(digest).decode('ascii').rstrip('=')
	if enc == 'binary':
		return digest.decode('latin-1')

	raise ValueError(f'Unsupported encoding: {encoding}')
