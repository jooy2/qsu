from ._bots import _AI_AGENT_BOT_PATTERN


def isAiAgentBot(text: str) -> bool:
	return bool(text) and bool(_AI_AGENT_BOT_PATTERN.search(text))
