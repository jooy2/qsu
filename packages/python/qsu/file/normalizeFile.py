import unicodedata


def normalizeFile(filePath: str, normalizationForm: str = None) -> str:
	# NFD - macOS
	# NFC - Windows
	if not filePath or len(filePath) < 1:
		return ''

	# JS String.prototype.normalize() defaults to 'NFC'.
	form = normalizationForm if normalizationForm else 'NFC'

	return unicodedata.normalize(form, filePath)
