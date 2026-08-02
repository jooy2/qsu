import { createDecipheriv } from 'node:crypto';
import { AEAD_ALGORITHM } from './encrypt.js';

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
	const arrStr: string[] = str.split(':');
	const isAead = AEAD_ALGORITHM.test(algorithm);

	if (arrStr.length < (isAead ? 3 : 2)) {
		throw new Error(
			isAead
				? '`str` must be in the `iv:authTag:encrypted` format returned by `encrypt`.'
				: '`str` must be in the `iv:encrypted` format returned by `encrypt`.'
		);
	}

	const iv = Buffer.from(arrStr.shift() as string, encoding);
	const authTag = isAead ? Buffer.from(arrStr.shift() as string, encoding) : null;
	const decipher = createDecipheriv(algorithm, secret, iv);

	if (authTag) {
		(decipher as unknown as { setAuthTag: (tag: Buffer) => void }).setAuthTag(authTag);
	}

	let decrypted = decipher.update(Buffer.from(arrStr.join(':'), encoding));

	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
}
