import base64


def encodeBase64(str: str) -> str:
	return base64.b64encode(str.encode('utf-8')).decode('utf-8')
