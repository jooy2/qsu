from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .decodeBase64 import decodeBase64 as decodeBase64
	from .decrypt import decrypt as decrypt
	from .encodeBase64 import encodeBase64 as encodeBase64
	from .encrypt import encrypt as encrypt
	from .md5Hash import md5Hash as md5Hash
	from .numberHash import numberHash as numberHash
	from .objectId import objectId as objectId
	from .sha1Hash import sha1Hash as sha1Hash
	from .sha256Hash import sha256Hash as sha256Hash
	from .sha512Hash import sha512Hash as sha512Hash

__all__ = [
	'decodeBase64',
	'decrypt',
	'encodeBase64',
	'encrypt',
	'md5Hash',
	'numberHash',
	'objectId',
	'sha1Hash',
	'sha256Hash',
	'sha512Hash',
]

lazy(__name__)
