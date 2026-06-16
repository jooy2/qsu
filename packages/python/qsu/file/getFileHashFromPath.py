import hashlib


def getFileHashFromPath(filePath: str, algorithm: str = 'md5') -> str:
	if not filePath:
		raise Exception('Invalid path')

	hashHandler = hashlib.new(algorithm)

	with open(filePath, 'rb') as stream:
		for chunk in iter(lambda: stream.read(65536), b''):
			hashHandler.update(chunk)

	return hashHandler.hexdigest()
