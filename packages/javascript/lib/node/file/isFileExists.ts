import { stat } from 'fs/promises';

export async function isFileExists(filePath: string): Promise<boolean> {
	try {
		// `stat` follows symlinks, so a dangling link reports as missing. This
		// matches Dart's `File.exists` and Python's `os.path.exists`. `access`
		// was avoided because on Windows it reports the reparse point of a
		// dangling symlink as existing, breaking cross-language parity.
		await stat(filePath);
		return true;
	} catch {
		return false;
	}
}
