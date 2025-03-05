import { access } from 'fs/promises';
import { constants } from 'fs';

export async function isFileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath, constants.F_OK);
		return true;
	} catch (error) {
		return false;
	}
}
