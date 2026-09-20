import { cwd } from 'node:process';
import { fileSizeFormat } from '../../format/fileSizeFormat.js';
import { diskSpace } from './_diskSpace.js';

export async function getFreeDiskSize(path: string = cwd()): Promise<string> {
	return fileSizeFormat((await diskSpace(path)).free, 0, true);
}
