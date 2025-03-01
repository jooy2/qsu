import { createDecipheriv } from 'node:crypto';

export function decrypt(
	str: string,
	secret: string,
	algorithm = 'aes-256-cbc',
	toBase64 = false
): string {
	if (!str || str.length < 1) {
		return '';
	}

	const encoding: BufferEncoding = toBase64 ? 'base64' : 'hex';
	const arrStr: any[] = str.split(':');
	const decipher = createDecipheriv(algorithm, secret, Buffer.from(arrStr.shift(), encoding));
	let decrypted = decipher.update(Buffer.from(arrStr.join(':'), encoding));

	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
}
