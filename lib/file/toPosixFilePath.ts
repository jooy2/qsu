export function toPosixFilePath(filePath: string): string {
	return filePath
		.replace(/^\\\\\?\\/, '')
		.replace(/\\/g, '/')
		.replace(/\/\/+/g, '/');
}
