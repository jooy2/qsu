import os


def createDirectory(filePath: str, recursive: bool = True) -> None:
	if recursive:
		# `makedirs` with `exist_ok` is already a no-op for an existing
		# directory, so the `isFileExists` call that used to guard this was a
		# wasted system call. It also reported success when a *file* sat at the
		# path, because the guard only asked whether something was there.
		os.makedirs(filePath, exist_ok=True)
		return

	try:
		os.mkdir(filePath)
	except FileExistsError:
		# An existing directory stays a no-op. Anything else in the way is an
		# error the caller needs to see.
		if not os.path.isdir(filePath):
			raise
