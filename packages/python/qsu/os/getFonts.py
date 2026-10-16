import os
import stat as statModule
import sys
from typing import List, Optional, Set

from ._font import readFontFile

_FONT_EXTENSIONS = ('.ttf', '.otf', '.ttc', '.otc')

_DARWIN_ASSET_DIR = '/System/Library/AssetsV2'
_DARWIN_ASSET_PREFIX = 'com_apple_MobileAsset_Font'

_WINDOWS_FONT_KEY = r'SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts'


def getFonts(options=None, **kwargs) -> List[dict]:
	opts = {**(options or {}), **kwargs}
	directories = opts.get('directories')
	searched = _defaultFontDirectories() if directories is None else directories
	files = _findFontFiles([os.path.abspath(directory) for directory in searched])

	if directories is None and sys.platform == 'win32':
		files.update(_registeredFontFiles())

	faces = []

	for path in files:
		try:
			faces.extend(readFontFile(path))
		except (OSError, ValueError):
			# Not a font after all, cut short, or not readable by this user.
			continue

	# A family named with a leading dot is one macOS keeps for itself and hides
	# from every font menu. Text is compared by UTF-16 code unit, which is how the
	# other two packages order it.
	return sorted(
		(face for face in faces if not face['family'].startswith('.')),
		key=lambda face: (_codeUnits(face['family']), _codeUnits(face['path']), face['index']),
	)


def _codeUnits(text: str) -> bytes:
	return text.encode('utf-16-be', 'surrogatepass')


def _defaultFontDirectories() -> List[str]:
	home = os.path.expanduser('~')

	if sys.platform == 'darwin':
		return [
			'/System/Library/Fonts',
			'/Library/Fonts',
			os.path.join(home, 'Library', 'Fonts'),
			# Fonts macOS downloads on demand, which it lists alongside its own.
			*_darwinAssetDirectories(),
		]

	if sys.platform == 'ios':
		return ['/System/Library/Fonts']

	if sys.platform == 'win32':
		windowsDir = os.environ.get('WINDIR') or os.environ.get('SystemRoot') or 'C:\\Windows'
		directories = [os.path.join(windowsDir, 'Fonts')]
		localAppData = os.environ.get('LOCALAPPDATA')

		# Where a font installed for one user goes, since Windows 10 1809.
		if localAppData:
			directories.append(os.path.join(localAppData, 'Microsoft', 'Windows', 'Fonts'))

		return directories

	# Python before 3.13 reports Android as `linux`.
	if sys.platform == 'android' or hasattr(sys, 'getandroidapilevel'):
		return ['/system/fonts']

	# The XDG base directories, which fontconfig reads as well. A relative path in
	# either variable is invalid by that specification and ignored.
	dataHome = os.environ.get('XDG_DATA_HOME', '')
	dataDirs = (os.environ.get('XDG_DATA_DIRS') or '/usr/local/share:/usr/share').split(':')

	if not os.path.isabs(dataHome):
		dataHome = os.path.join(home, '.local', 'share')

	return [
		os.path.join(dataHome, 'fonts'),
		*(os.path.join(directory, 'fonts') for directory in dataDirs if os.path.isabs(directory)),
		os.path.join(home, '.fonts'),
	]


def _darwinAssetDirectories() -> List[str]:
	try:
		names = os.listdir(_DARWIN_ASSET_DIR)
	except OSError:
		return []

	return [
		os.path.join(_DARWIN_ASSET_DIR, name) for name in names if name.startswith(_DARWIN_ASSET_PREFIX)
	]


def _findFontFiles(directories: List[str]) -> Set[str]:
	"""Every font file under the directories, as a real path, so a file reached
	through two links or two overlapping directories is read once.
	"""
	files: Set[str] = set()
	visited: Set[str] = set()

	def walk(directory: str) -> None:
		realDirectory = os.path.realpath(directory)

		if realDirectory in visited:
			return

		visited.add(realDirectory)

		try:
			entries = list(os.scandir(realDirectory))
		except OSError:
			# A directory that does not exist or cannot be read holds no fonts.
			return

		for entry in entries:
			path = os.path.join(realDirectory, entry.name)

			if entry.is_symlink():
				addLink(path, entry.name)
			elif entry.is_dir(follow_symlinks=False):
				walk(path)
			elif entry.is_file(follow_symlinks=False) and _isFontFileName(entry.name):
				files.add(path)

	def addLink(path: str, name: str) -> None:
		try:
			mode = os.stat(path).st_mode
		except OSError:
			# A link whose target is gone.
			return

		if statModule.S_ISDIR(mode):
			walk(path)
		elif _isFontFileName(name):
			files.add(os.path.realpath(path))

	for directory in directories:
		walk(directory)

	return files


def _isFontFileName(name: str) -> bool:
	return os.path.splitext(name)[1].lower() in _FONT_EXTENSIONS


def _registeredFontFiles() -> List[str]:
	"""Font files Windows has registered from outside its font directories. A value
	holding a bare file name is one in `%WINDIR%\\Fonts`, which is read already.
	"""
	if sys.platform != 'win32':
		return []

	import winreg

	files = []

	for hive in (winreg.HKEY_LOCAL_MACHINE, winreg.HKEY_CURRENT_USER):
		try:
			key = winreg.OpenKey(
				hive, _WINDOWS_FONT_KEY, 0, winreg.KEY_READ | winreg.KEY_WOW64_64KEY
			)
		except OSError:
			# The per-user key does not exist until a user installs a font.
			continue

		with key:
			index = 0

			while True:
				try:
					_, value, valueType = winreg.EnumValue(key, index)
				except OSError:
					break

				index += 1
				path: Optional[str] = value if valueType == winreg.REG_SZ else None

				# Registered, then removed without being unregistered, is skipped too.
				if path and os.path.isabs(path) and _isFontFileName(path) and os.path.exists(path):
					files.append(os.path.realpath(path))

	return files
