import { cwd } from 'node:process';
import { fileSizeFormat } from '../../format/fileSizeFormat.js';
import { diskSpace } from './_diskSpace.js';

export async function getDiskSize(path: string = cwd()): Promise<string> {
	return fileSizeFormat((await diskSpace(path)).total, 0, true);
}
