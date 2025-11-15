import { createReadStream } from 'fs';
import { createInterface } from 'node:readline';

export async function tailFile(filePath: string, length = 1): Promise<string | null> {
	if (length <= 0) {
		return null;
	}

	return new Promise((resolve, reject) => {
		const stream = createReadStream(filePath, { encoding: 'utf-8' });
		const rl = createInterface({ input: stream, crlfDelay: Infinity });

		const buffer: string[] = [];

		rl.on('line', (line) => {
			if (buffer.length === length) {
				buffer.shift();
			}
			buffer.push(line);
		});

		rl.on('close', () => {
			if (buffer.length === 0) {
				resolve(null);
				return;
			}

			if (buffer[buffer.length - 1] === '') {
				buffer.pop();
			}

			if (buffer.length === 0) {
				resolve(null);
				return;
			}

			resolve(buffer.join('\n'));
		});

		rl.on('error', (err) => reject(err));
		stream.on('error', (err) => reject(err));
	});
}
