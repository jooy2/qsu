export function fileExt(filePath: string): string {
	if (filePath.indexOf('.') === -1) {
		return 'Unknown';
	}

	const pSpl = filePath.trim().toLowerCase().split('.');

	return pSpl.length > 0 ? pSpl[pSpl.length - 1] : 'Unknown';
}
