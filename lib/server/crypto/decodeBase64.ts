export function decodeBase64(encodedStr: string): string {
	return Buffer.from(encodedStr, 'base64').toString('utf8');
}
