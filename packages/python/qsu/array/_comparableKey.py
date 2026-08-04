import json
import math


def _comparableKey(value) -> str:
	"""(Private) A stable string key for a value, so that array membership can be decided by
	value instead of by identity. Python cannot hash a list or a dict at all, so an identity
	comparison could not have been ported to all three languages.
	"""
	if value is None:
		return 'null'

	# `bool` is a subclass of `int`, so it has to be answered before the numeric branch.
	if isinstance(value, bool):
		return 'boolean:true' if value else 'boolean:false'

	if isinstance(value, (int, float)):
		if isinstance(value, float):
			if math.isnan(value):
				return 'number:NaN'
			if math.isinf(value):
				return 'number:Infinity' if value > 0 else 'number:-Infinity'
			# JavaScript has no int/float distinction, so `1` and `1.0` are one value there.
			if value == int(value) and abs(value) < 1e18:
				return f'number:{int(value)}'

		return f'number:{value}'

	if isinstance(value, str):
		return f'string:{value}'

	try:
		return 'json:' + json.dumps(value, default=str, separators=(',', ':'))
	except (TypeError, ValueError):
		# A cyclic structure has no JSON form.
		return f'json:{value}'
