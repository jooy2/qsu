import { open, utimes } from 'fs/promises';

export async function createFile(filePath: string): Promise<void> {
	if (!filePath) {
		return;
	}

	const date: Date = new Date();

	try {
		await utimes(filePath, date, date);
	} catch {
		const data = await open(filePath, 'a');

		await data.close();
	}
}
