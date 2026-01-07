import { posix, win32 } from 'path';

export function toValidFilePath(filePath: string, isWindows?: boolean): string {
	if (filePath?.length < 1) {
		return isWindows ? '\\' : '/';
	}
	if (isWindows) {
		let p = filePath;

		p = win32.normalize(p).replace(/\.$/g, '');

		if (p.endsWith('\\') && p.length > 1) {
			p = p.replace(/\\+$/, '');
		}
		if (p.endsWith(':')) {
			p = `${p}\\`;
		}
		if (!p.startsWith('\\') && p.indexOf(':') === -1) {
			p = `\\${p}`;
		}

		return p;
	} else {
		let p = filePath;

		p = posix.normalize(p);

		if (!posix.isAbsolute(p)) {
			p = `/${p}`;
		}
		if (p.endsWith('/') && p.length > 1) {
			p = p.slice(0, -1);
		}

		return p;
	}
}
