import { open } from 'fs/promises';

const CHUNK_SIZE = 64 * 1024;

// Node's readline (`crlfDelay: Infinity`) breaks a line on '\n', '\r\n' and a
// lone '\r'.
const LINE_BREAK_REGEX = /\r\n|\n|\r/;

function splitLines(text: string): string[] {
	const lines = text.split(LINE_BREAK_REGEX);

	// A break at the end of the text closes the last line, it does not open an
	// empty one. This is what readline does.
	if (lines.length > 1 && lines[lines.length - 1] === '') {
		lines.pop();
	}

	return lines;
}

export async function tailFile(filePath: string, length = 1): Promise<string | null> {
	if (length <= 0) {
		return null;
	}

	const handle = await open(filePath, 'r');

	try {
		const { size } = await handle.stat();

		if (size === 0) {
			return null;
		}

		// Read backwards from the end of the file so the work follows the number
		// of lines asked for rather than the size of the file. Reading forwards
		// means a 10 GB log is streamed in full to answer for its last line.
		const chunks: Buffer[] = [];
		let position = size;
		let lines: string[] = [];

		while (position > 0) {
			const readLength = Math.min(CHUNK_SIZE, position);
			position -= readLength;

			const chunk = Buffer.alloc(readLength);

			await handle.read(chunk, 0, readLength, position);
			chunks.unshift(chunk);

			lines = splitLines(Buffer.concat(chunks).toString('utf-8'));

			// One line more than asked for means the first line held in the
			// buffer is complete garbage - it starts wherever the chunk boundary
			// fell, possibly mid-character - but it is also about to be dropped.
			if (lines.length > length) {
				break;
			}
		}

		const buffer = lines.slice(-length);

		// The last line of newline characters is ignored.
		if (buffer.length > 0 && buffer[buffer.length - 1] === '') {
			buffer.pop();
		}

		if (buffer.length === 0) {
			return null;
		}

		return buffer.join('\n');
	} finally {
		await handle.close();
	}
}
