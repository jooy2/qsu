import { getFileName } from './getFileName';

export function isValidFileName(filePath: string, unixType?: boolean): boolean {
	let fileNameRegex;
	const fileName = getFileName(filePath);

	if (unixType) {
		fileNameRegex = /(^\s+$)|(^\.+$)|([:/]+)/;
	} else {
		// Windows
		fileNameRegex = /(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)/;
	}

	return !fileNameRegex.test(fileName) && fileName.length <= 255;
}
