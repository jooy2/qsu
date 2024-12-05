import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'node:crypto';

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

export function objectId(): string {
	return (
		Math.floor(Date.now() / 1000).toString(16) +
		'x'.repeat(16).replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
	);
}

export function md5Hash(str: string): string {
	return createHash('md5').update(str).digest('hex');
}

export function sha1Hash(str: string): string {
	return createHash('sha1').update(str).digest('hex');
}

export function sha256Hash(str: string): string {
	return createHash('sha256').update(str).digest('hex');
}

export function encodeBase64(str: string): string {
	return Buffer.from(str, 'utf8').toString('base64');
}

export function decodeBase64(encodedStr: string): string {
	return Buffer.from(encodedStr, 'base64').toString('utf8');
}

export function strToNumberHash(str: string): number {
	if (!str) {
		return 0;
	}

	let hash = 0;

	for (let i = 0; i < str.length; i += 1) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}

	return hash;
}
