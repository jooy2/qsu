import { Stats } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, resolve as pathResolve } from 'node:path';
import { getFileExtension } from './getFileExtension.js';
import { fileSizeFormat } from '../../format/fileSizeFormat.js';
import { getFileName } from './getFileName.js';
import { FileInfo } from '../../_types/global';

export async function getFileInfo(filePath: string): Promise<FileInfo> {
	const dateToUnixTime = (date: Date): number => Math.floor(new Date(date).getTime() / 1000);

	// The filesystem error is thrown as it is. Re-throwing `new Error(message)`
	// dropped `code`, `errno` and `path`, so a caller could not tell ENOENT from
	// EACCES, and the original stack was lost with them.
	const fileItem: Stats = await stat(filePath);

	return {
		success: true,
		isDirectory: fileItem.isDirectory(),
		ext: getFileExtension(filePath),
		size: fileItem.size,
		sizeHumanized: fileSizeFormat(fileItem.size),
		name: getFileName(filePath),
		dirname: dirname(filePath),
		path: pathResolve(filePath),
		created: dateToUnixTime(fileItem.ctime),
		modified: dateToUnixTime(fileItem.mtime)
	};
}
