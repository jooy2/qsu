import { posix, win32 } from 'node:path';

export function toValidFilePath(filePath: string, isWindows?: boolean): string {
	if (filePath?.length < 1) {
		return isWindows ? '\\' : '/';
	}
	if (isWindows) {
		let p = filePath;

		p = win32.normalize(p).replace(/\.$/g, '');

		if (!p.startsWith('\\') && p.indexOf(':') === -1) {
			// Anchor the path *before* resolving the rest of it: '..' cannot
			// climb above the root, so '..\\..\\Users' is '\\Users' rather than
			// the '\\..\\..\\Users' a plain prefix would leave behind.
			p = win32.normalize(`\\${p}`);
		}
		if (p.endsWith('\\') && p.length > 1) {
			p = p.replace(/\\+$/, '');
		}
		if (p.endsWith(':')) {
			p = `${p}\\`;
		}

		return p;
	} else {
		let p = filePath;

		p = posix.normalize(p);

		// `normalize` collapses an empty or self-referential path to '.', which
		// must resolve to the root rather than to a literal '/.' segment.
		if (p === '.') {
			return '/';
		}

		if (!posix.isAbsolute(p)) {
			// Anchor the path *before* resolving the rest of it: '..' cannot
			// climb above the root, so '../../etc/passwd' is '/etc/passwd'
			// rather than the '/../../etc/passwd' a plain prefix would leave.
			p = posix.normalize(`/${p}`);
		}
		if (p.endsWith('/') && p.length > 1) {
			p = p.slice(0, -1);
		}

		return p;
	}
}
