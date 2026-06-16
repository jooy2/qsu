import json


def objToPrettyStr(obj) -> str:
	return json.dumps(obj, indent='\t', ensure_ascii=False)
