import { getFileName } from './getFileName.js';

export function getCopyFileName(fileName: string, fileNameList: string[]): string {
	const fName = getFileName(fileName);
	// Take the extension straight off the original name instead of going through
	// getFileExtension, which lower-cases it. `Report.PDF` must copy to
	// `Report (1).PDF`, not `Report (1).pdf`.
	const fExt = getFileName(fileName, true).slice(fName.length);

	const existingSet = new Set(fileNameList);

	if (!existingSet.has(fileName)) {
		return fileName;
	}

	for (let i = 1; ; i++) {
		const candidate = `${fName} (${i})${fExt}`;

		if (!existingSet.has(candidate)) {
			return candidate;
		}
	}
}
