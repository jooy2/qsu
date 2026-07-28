export function trim(str?: string | null): string | null {
	// Reject anything that is not a string. The previous `&&` meant a truthy non-string
	// slipped through and threw on `.trim()`. An empty string is a valid input and still
	// returns ''.
	if (typeof str !== 'string') {
		return null;
	}

	return str.trim().replace(/\s{2,}/g, ' ');
}
