import { Stats } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, resolve as pathResolve } from 'path';
import { getFileExtension } from './getFileExtension.js';
import { getFileSize } from './getFileSize.js';
import { getFileName } from './getFileName.js';
import { FileInfo } from '../../_types/global';

export async function getFileInfo(filePath: string): Promise<FileInfo> {
	const dateToUnixTime = (date: Date): number => Math.floor(new Date(date).getTime() / 1000);

	try {
		const fileItem: Stats = await stat(filePath);

		return {
			success: true,
			isDirectory: fileItem.isDirectory(),
			ext: getFileExtension(filePath),
			size: fileItem.size,
			sizeHumanized: getFileSize(fileItem.size),
			name: getFileName(filePath),
			dirname: dirname(filePath),
			path: pathResolve(filePath),
			created: dateToUnixTime(fileItem.ctime),
			modified: dateToUnixTime(fileItem.mtime)
		};
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}

	return {
		success: false,
		isDirectory: false,
		ext: null,
		size: 0,
		sizeHumanized: '0 Bytes',
		name: 'unknown',
		dirname: dirname(filePath),
		path: filePath,
		created: -1,
		modified: -1
	};
}
