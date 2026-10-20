from ._bots import _AI_SEARCH_BOT_PATTERN


def isAiSearchBot(text: str) -> bool:
	return bool(text) and bool(_AI_SEARCH_BOT_PATTERN.search(text))
