import { createCipheriv, randomBytes } from 'node:crypto';

export function encrypt(
	str: string,
	secret: string,
	algorithm = 'aes-256-cbc',
	ivSize = 16,
	toBase64 = false
): string {
	if (!str || str.length < 1) {
		return '';
	}

	const iv: Buffer = randomBytes(ivSize);
	const cipher = createCipheriv(algorithm, secret, iv);
	let enc = cipher.update(str);

	enc = Buffer.concat([enc, cipher.final()]);

	const encoding: BufferEncoding = toBase64 ? 'base64' : 'hex';

	return `${iv.toString(encoding)}:${enc.toString(encoding)}`;
}
