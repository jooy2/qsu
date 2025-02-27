export function removeLocalePrefix(urlOrPathname: string, locales: string | string[]): string {
	const localeLists = Array.isArray(locales) ? locales : [locales];

	if (localeLists.includes(urlOrPathname.replace(/^\//, ''))) {
		return '';
	}

	if (urlOrPathname === '/') {
		return '/';
	}

	const joinLocaleLists = localeLists.join('|');

	try {
		const urlObj = new URL(urlOrPathname);

		if (urlObj.pathname === '/' || localeLists.includes(urlObj.pathname.replace(/^\//, ''))) {
			return urlObj.origin;
		}

		return `${urlObj.origin}${urlObj.pathname.replace(new RegExp(`^/(${joinLocaleLists})/`), '/')}`.replace(
			/\/$/,
			''
		);
	} catch {
		let realPathname = urlOrPathname;

		if (!realPathname.startsWith('/')) {
			realPathname = `/${realPathname}`;
		}

		if (realPathname.endsWith('/')) {
			realPathname = realPathname.replace(/\/$/, '');
		}

		if (new RegExp(`^/(${joinLocaleLists})$`).test(realPathname)) {
			return '/';
		}

		return realPathname.replace(new RegExp(`^/(${joinLocaleLists})/`), '/');
	}
}
