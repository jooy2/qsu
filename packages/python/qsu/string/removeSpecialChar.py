import re
from typing import Optional

def removeSpecialChar(str: str, exceptionCharacters: Optional[str] = None) -> str:
	if not str:
		return ''

	exception = re.escape(exceptionCharacters) if exceptionCharacters else ''
	pattern = (
		'[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ'
		'0-9぀-ヿ㐀-䶿一-鿿豈-﫿ｦ-ﾟ'
		+ exception
		+ ']'
	)

	return re.sub(pattern, '', str, flags=re.IGNORECASE)
