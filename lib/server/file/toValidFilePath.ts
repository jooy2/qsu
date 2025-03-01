export function toValidFilePath(filePath: string, isWindows?: boolean): string {
	if (isWindows) {
		let windowsPath = filePath;

		if (windowsPath.length > 2 && !/^[a-zA-Z]:/.test(windowsPath)) {
			windowsPath = `\\${windowsPath}`;
		}

		if ((windowsPath.match(/\\/g) || []).length > 1 && /\\$/.test(windowsPath)) {
			windowsPath = windowsPath.replace(/\\$/, '');
		}

		if (/^[a-zA-Z]:$/.test(windowsPath)) {
			windowsPath = `${windowsPath}\\`;
		}

		return windowsPath.replace(/\\{2,}/g, '\\');
	}

	let unixPath: string = filePath;

	if (!/^\//.test(unixPath)) {
		unixPath = `/${unixPath}`;
	}

	unixPath = unixPath.replace(/\/{2,}/g, '/');

	if (unixPath.length > 1) {
		unixPath = unixPath.replace(/\/$/, '');
	}

	return unixPath;
}
