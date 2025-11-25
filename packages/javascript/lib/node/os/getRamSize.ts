import { totalmem } from 'node:os';
import { fileSizeFormat } from '../../format/fileSizeFormat.js';

export function getRamSize(): string {
	return fileSizeFormat(totalmem(), 0, true);
}
