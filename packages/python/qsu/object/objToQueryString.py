import json
from urllib.parse import quote


def _encodeURIComponent(value) -> str:
	if isinstance(value, bool):
		value = 'true' if value else 'false'
	elif value is None:
		value = 'null'
	else:
		value = f'{value}'

	return quote(value, safe="!~*'()")


def objToQueryString(obj) -> str:
	parts = []

	for key in obj.keys():
		value = obj[key]

		if isinstance(value, (dict, list, tuple)):
			value = json.dumps(value, separators=(',', ':'), ensure_ascii=False)

		parts.append(f'{_encodeURIComponent(key)}={_encodeURIComponent(value)}')

	return '&'.join(parts)
