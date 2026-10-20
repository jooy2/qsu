from ._bots import _AI_TRAINING_BOT_PATTERN


def isAiTrainingBot(text: str) -> bool:
	return bool(text) and bool(_AI_TRAINING_BOT_PATTERN.search(text))
