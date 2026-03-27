import { getFileName } from './getFileName.js';
import { getFileExtension } from './getFileExtension.js';

export function getCopyFileName(fileName: string, fileNameList: string[]): string {
	const fName = getFileName(fileName);
	const fExt = getFileExtension(fileName);

	const existingSet = new Set(fileNameList);

	if (!existingSet.has(fileName)) {
		return fileName;
	}

	for (let i = 1; ; i++) {
		const candidate = `${fName} (${i})${fExt ? `.${fExt}` : ''}`;

		if (!existingSet.has(candidate)) {
			return candidate;
		}
	}
}
