import { freemem } from 'node:os';
import { fileSizeFormat } from '../../format/fileSizeFormat.js';

export function getFreeRamSize(): string {
	return fileSizeFormat(freemem(), 0, true);
}
