import re


def trim(str: str = None):
	if not isinstance(str, type('')) and not str:
		return None

	return re.sub(r'\s{2,}', ' ', str.strip())
