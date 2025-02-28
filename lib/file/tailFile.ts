import { readFile } from 'fs/promises';

export async function tailFile(filePath: string, length = 1): Promise<string | null> {
	try {
		const content = await readFile(filePath, 'utf-8');
		const contentByLine = content.split(process.platform === 'win32' ? '\r\n' : '\n');
		let result = '';

		if (contentByLine[contentByLine.length - 1].length < 1) {
			contentByLine.pop();
		}

		for (let i = contentByLine.length, len = contentByLine.length - length; i > len; i -= 1) {
			result = `${contentByLine[i - 1]}${result.length < 1 || i - 1 === len ? '' : '\n'}${result}`;
		}

		return result.length < 1 ? null : result;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
	return null;
}
