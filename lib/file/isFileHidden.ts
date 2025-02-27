import { exec } from 'child_process';

export function isFileHidden(filePath: string, isWindows = false): Promise<boolean> {
	return new Promise<boolean>((resolve) => {
		if (isWindows) {
			exec(`attrib "${filePath}"`, (error, stdout, stderr) => {
				if (error || stderr || !stdout) {
					resolve(false);
					return;
				}
				resolve(stdout.replace(filePath, '').includes('H'));
			});
		} else {
			resolve(/(^|\/)\.[^/.]/.test(filePath.split('/')?.pop() || '/'));
		}
	});
}
