import { createReadStream } from 'fs';
import { createInterface } from 'node:readline';

export async function headFile(filePath: string, length = 1): Promise<string | null> {
	if (length <= 0) {
		return null;
	}

	return new Promise((resolve, reject) => {
		const stream = createReadStream(filePath, { encoding: 'utf-8' });
		const rl = createInterface({ input: stream, crlfDelay: Infinity });

		const lines: string[] = [];

		rl.on('line', (line) => {
			lines.push(line);

			if (lines.length >= length) {
				rl.close();
				stream.destroy();
			}
		});

		rl.on('close', () => {
			if (lines.length === 0) {
				resolve(null);
			} else {
				resolve(lines.join('\n'));
			}
		});

		rl.on('error', (err) => reject(err));
		stream.on('error', (err) => reject(err));
	});
}
