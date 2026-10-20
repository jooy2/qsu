from ._bots import _BOT_PATTERN, _NOT_BOT_PATTERN


def isBot(text: str) -> bool:
	# The devices and apps whose names happen to contain a generic word, such as a Cubot
	# phone, are taken out before the names are read.
	return bool(text) and bool(_BOT_PATTERN.search(_NOT_BOT_PATTERN.sub('', text)))
