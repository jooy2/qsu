def isEmpty(data=None) -> bool:
	if not data:
		return True

	if isinstance(data, str):
		return len(data) < 1
	if isinstance(data, (list, tuple)):
		return len(data) < 1
	if isinstance(data, dict):
		return len(data.keys()) < 1

	return False
