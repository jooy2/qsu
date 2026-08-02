import { createCipheriv, randomBytes } from 'node:crypto';

// AEAD modes (GCM, CCM, OCB, ChaCha20-Poly1305) produce an authentication tag that is
// required to decrypt. Without it the ciphertext can never be read back.
export const AEAD_ALGORITHM = /gcm|ccm|ocb|poly1305/i;

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

	if (AEAD_ALGORITHM.test(algorithm)) {
		const authTag = (cipher as unknown as { getAuthTag: () => Buffer }).getAuthTag();

		return `${iv.toString(encoding)}:${authTag.toString(encoding)}:${enc.toString(encoding)}`;
	}

	return `${iv.toString(encoding)}:${enc.toString(encoding)}`;
}
