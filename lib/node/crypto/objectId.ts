export function objectId(): string {
	return (
		Math.floor(Date.now() / 1000).toString(16) +
		'x'.repeat(16).replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
	);
}
