import { freemem, totalmem } from 'node:os';
import { fileSizeFormat } from '../../format/fileSizeFormat.js';

export function getUsedRamSize(): string {
	return fileSizeFormat(Math.max(totalmem() - freemem(), 0), 0, true);
}
