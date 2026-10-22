import re
from typing import Optional

def removeSpecialChars(str: str, allowedCharacters: Optional[str] = None) -> str:
	if not str:
		return ''

	allowed = re.escape(allowedCharacters) if allowedCharacters else ''
	pattern = (
		'[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ'
		'0-9぀-ヿ㐀-䶿一-鿿豈-﫿ｦ-ﾟ'
		+ allowed
		+ ']'
	)

	return re.sub(pattern, '', str, flags=re.IGNORECASE)
