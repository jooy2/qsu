import json
from typing import Any, Optional


def safeJSONParse(jsonString: Any, fallback: Optional[dict] = None) -> dict:
	if fallback is None:
		fallback = {}

	if not jsonString:
		return fallback

	if isinstance(jsonString, (list, dict)):
		try:
			return json.loads(json.dumps(jsonString))
		except (TypeError, ValueError):
			return fallback

	try:
		return json.loads(jsonString)
	except (TypeError, ValueError):
		return fallback
