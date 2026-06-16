import builtins


def len(data) -> int:
	if not data:
		return 0

	if type(data) is bool:
		return 4 if data else 5
	if isinstance(data, (list, tuple)):
		return builtins.len(data)
	if isinstance(data, dict):
		return builtins.len(data.keys())
	if isinstance(data, (int, float)):
		return builtins.len(str(data))
	if callable(data):
		return builtins.len(data())
	if isinstance(data, str):
		return builtins.len(data)

	return builtins.len(data)
