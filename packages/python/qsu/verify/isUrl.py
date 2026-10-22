from urllib.parse import urlparse


def isUrl(url: str, allowMissingProtocol: bool = False, requireDot: bool = False) -> bool:
	if requireDot and url.find('.') == -1:
		return False

	target = (
		('https://' if allowMissingProtocol and url.find('://') == -1 else '') + url
	)

	try:
		parsed = urlparse(target)
	except ValueError:
		return False

	if not parsed.scheme or not parsed.netloc:
		return False

	return True
