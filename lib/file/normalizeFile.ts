// NFD - macOS
// NFC - Windows
export function normalizeFile(
	filePath: string,
	normalizationForm?: 'NFD' | 'NFC' | 'NFKC' | 'NFKD' | undefined
): string {
	if (!filePath || filePath.length < 1) {
		return '';
	}

	return filePath.normalize(normalizationForm);
}
