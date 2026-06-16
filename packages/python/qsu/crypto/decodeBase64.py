import base64


def decodeBase64(encodedStr: str) -> str:
	return base64.b64decode(encodedStr).decode('utf-8')
