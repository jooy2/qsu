import { toValidFilePath } from './toValidFilePath';

export function getParentFilePath(filePath: string, isWindows?: boolean): string {
	const listPathItem = filePath.split(isWindows ? '\\' : '/');
	let currentPath;

	listPathItem.pop();

	if (listPathItem.length === 1) {
		if (isWindows) {
			currentPath = 'C:\\';
		} else {
			currentPath = '/';
		}
	} else {
		currentPath = listPathItem.join(isWindows ? '\\' : '/');
	}

	return toValidFilePath(currentPath, isWindows);
}
