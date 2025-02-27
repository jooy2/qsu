export function encodeBase64(str: string): string {
	return Buffer.from(str, 'utf8').toString('base64');
}
