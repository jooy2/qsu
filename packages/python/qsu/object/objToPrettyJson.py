import json


def objToPrettyJson(obj) -> str:
	return json.dumps(obj, indent='\t', ensure_ascii=False)
