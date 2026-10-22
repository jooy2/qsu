export function isUrl(url: string, allowMissingProtocol = false, requireDot = false): boolean {
	if (requireDot && url.indexOf('.') === -1) {
		return false;
	}

	try {
		new URL(
			`${allowMissingProtocol && url.indexOf('://') === -1 ? 'https://' : ''}${url}`
		).toString();
	} catch {
		return false;
	}

	return true;
}
