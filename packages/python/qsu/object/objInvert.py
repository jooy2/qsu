from .._toKeyString import _toKeyString


def objInvert(obj):
	if not isinstance(obj, dict):
		return None

	# Top level only, like Lodash's `invert`. When two entries share a value, the later one
	# wins, because both land on the same key.
	return {_toKeyString(value): key for key, value in obj.items()}
