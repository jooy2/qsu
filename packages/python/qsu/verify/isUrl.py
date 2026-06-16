from urllib.parse import urlparse


def isUrl(url: str, withProtocol: bool = False, strict: bool = False) -> bool:
	if strict and url.find('.') == -1:
		return False

	target = (
		('https://' if withProtocol and url.find('://') == -1 else '') + url
	)

	try:
		parsed = urlparse(target)
	except ValueError:
		return False

	if not parsed.scheme or not parsed.netloc:
		return False

	return True
