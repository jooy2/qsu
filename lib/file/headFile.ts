import { readFile } from 'fs/promises';

export async function headFile(filePath: string, length = 1): Promise<string | null> {
	try {
		const content = await readFile(filePath, 'utf-8');
		const contentByLine = content.split('\n');
		let result = '';

		for (let i = 0, len = length; i < len; i += 1) {
			result += `${contentByLine[i]}${length < 2 || i === len - 1 ? '' : '\n'}`;
		}

		return result.length < 1 ? null : result;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
	return null;
}
