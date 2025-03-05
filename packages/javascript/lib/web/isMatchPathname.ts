export function isMatchPathname(pathname: string, matcher: string | string[]): boolean {
	if (!pathname || !matcher || matcher?.length < 1) {
		throw new Error('`url` and `matcher` must be set');
	}

	const matcherSet = typeof matcher === 'string' ? [matcher] : matcher;
	const realPathname = pathname.split('?')[0].replace(/\/$/, '');

	return matcherSet.some((m) => {
		if (m === '*' || m === '/*') {
			return true;
		}

		const realMatcher = m.replace(/\*$/, '');

		return m.endsWith('*') ? realPathname.startsWith(realMatcher) : realMatcher === realPathname;
	});
}
