export function isUrl(url: string, withProtocol = false, strict = false): boolean {
	if (strict && url.indexOf('.') === -1) {
		return false;
	}

	try {
		new URL(`${withProtocol && url.indexOf('://') === -1 ? 'https://' : ''}${url}`).toString();
	} catch {
		return false;
	}

	return true;
}
