import { endianness } from 'node:os';

export function getEndianness(): 'BE' | 'LE' {
	return endianness();
}
