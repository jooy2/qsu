from .createFile import createFile


def createFileWithDummy(filePath: str, size: int) -> bool:
	if not size or size < 0:
		raise Exception('Size is required')

	try:
		if size == 0:
			createFile(filePath)
			return True

		with open(filePath, 'wb') as data:
			# Write a single null byte at offset (size - 1), producing a sparse
			# file of `size` bytes (mirrors Node's write at position size - 1).
			data.seek(size - 1)
			data.write(b'\x00')

		return True
	except Exception:
		return False
