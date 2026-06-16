import hashlib


def getFileHashFromStream(fileStream, algorithm: str = 'md5') -> str:
	if not fileStream:
		raise Exception('Invalid file stream detected')

	hashHandler = hashlib.new(algorithm)

	while True:
		chunk = fileStream.read(65536)

		if not chunk:
			break

		if isinstance(chunk, str):
			chunk = chunk.encode('utf-8')

		hashHandler.update(chunk)

	return hashHandler.hexdigest()
