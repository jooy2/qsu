from ._bots import _SEARCH_BOT_PATTERN


def isSearchBot(text: str) -> bool:
	return bool(text) and bool(_SEARCH_BOT_PATTERN.search(text))
