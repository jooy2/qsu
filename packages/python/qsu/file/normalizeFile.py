import unicodedata
from typing import Literal, Optional, cast

def normalizeFile(filePath: str, normalizationForm: Optional[str] = None) -> str:
	# NFD - macOS
	# NFC - Windows
	if not filePath or len(filePath) < 1:
		return ''

	# JS String.prototype.normalize() defaults to 'NFC'.
	form = normalizationForm if normalizationForm else 'NFC'

	return unicodedata.normalize(cast(Literal['NFC', 'NFD', 'NFKC', 'NFKD'], form), filePath)
