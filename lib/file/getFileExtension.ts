import { extname } from 'path';

export function getFileExtension(filePath: string, isWindows?: boolean): string | null {
	let strPath: string | undefined = filePath.split(isWindows ? '\\' : '/').pop();

	if (!strPath) {
		return null;
	}

	strPath = extname(strPath) || strPath;

	if (strPath.indexOf('.') === -1) {
		return null;
	}

	return strPath.split('.')?.pop()?.toLowerCase() || null;
}
