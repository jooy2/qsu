import { readdir, realpath, stat } from 'node:fs/promises';
import { homedir, platform } from 'node:os';
import { extname, isAbsolute, join, resolve } from 'node:path';
import { env } from 'node:process';
import type { FontInfo, GetFontsOptions } from '../../_types/global.js';
import { readFontFile } from './_fontFile.js';
import { runCommand } from './runCommand.js';

const FONT_EXTENSIONS = new Set(['.ttf', '.otf', '.ttc', '.otc']);

// Enough to keep the disk busy, and well under the 256 descriptors a macOS shell
// allows by default.
const MAX_OPEN_FILES = 16;

const DARWIN_ASSET_DIR = '/System/Library/AssetsV2';
const DARWIN_ASSET_PREFIX = 'com_apple_MobileAsset_Font';

const WINDOWS_FONT_KEYS = [
	'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts',
	'HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts'
];
const WINDOWS_FONT_VALUE = /\sREG_SZ\s+(.*\S)\s*$/;

export async function getFonts(options?: GetFontsOptions): Promise<FontInfo[]> {
	const directories = options?.directories ?? (await getDefaultFontDirectories());
	const files = await findFontFiles(directories.map((directory) => resolve(directory)));

	if (!options?.directories && platform() === 'win32') {
		for (const file of await getRegisteredFontFiles()) {
			files.add(file);
		}
	}

	const faces = await readFontFiles([...files]);

	// A family named with a leading dot is one macOS keeps for itself and hides
	// from every font menu.
	return faces.filter((face) => !face.family.startsWith('.')).sort(compareFaces);
}

async function getDefaultFontDirectories(): Promise<string[]> {
	const home = homedir();

	switch (platform()) {
		case 'darwin':
			return [
				'/System/Library/Fonts',
				'/Library/Fonts',
				join(home, 'Library', 'Fonts'),
				// Fonts macOS downloads on demand, which it lists alongside its own.
				...(await getDarwinAssetDirectories())
			];
		case 'win32': {
			const windowsDir = env.WINDIR || env.SystemRoot || 'C:\\Windows';
			const directories = [join(windowsDir, 'Fonts')];

			// Where a font installed for one user goes, since Windows 10 1809.
			if (env.LOCALAPPDATA) {
				directories.push(join(env.LOCALAPPDATA, 'Microsoft', 'Windows', 'Fonts'));
			}

			return directories;
		}
		case 'android':
			return ['/system/fonts'];
		default: {
			// The XDG base directories, which fontconfig reads as well. A relative
			// path in either variable is invalid by that specification and ignored.
			const dataHome = isAbsolute(env.XDG_DATA_HOME ?? '')
				? (env.XDG_DATA_HOME as string)
				: join(home, '.local', 'share');
			const dataDirs = (env.XDG_DATA_DIRS || '/usr/local/share:/usr/share')
				.split(':')
				.filter((directory) => isAbsolute(directory));

			return [
				join(dataHome, 'fonts'),
				...dataDirs.map((directory) => join(directory, 'fonts')),
				join(home, '.fonts')
			];
		}
	}
}

async function getDarwinAssetDirectories(): Promise<string[]> {
	try {
		const names = await readdir(DARWIN_ASSET_DIR);

		return names
			.filter((name) => name.startsWith(DARWIN_ASSET_PREFIX))
			.map((name) => join(DARWIN_ASSET_DIR, name));
	} catch {
		return [];
	}
}

/**
 * Every font file under the directories, as a real path, so a file reached
 * through two links or two overlapping directories is read once.
 */
async function findFontFiles(directories: string[]): Promise<Set<string>> {
	const files = new Set<string>();
	const visited = new Set<string>();

	const walk = async (directory: string): Promise<void> => {
		let realDirectory: string;
		let entries;

		try {
			realDirectory = await realpath(directory);

			if (visited.has(realDirectory)) {
				return;
			}

			visited.add(realDirectory);
			entries = await readdir(realDirectory, { withFileTypes: true });
		} catch {
			// A directory that does not exist or cannot be read holds no fonts.
			return;
		}

		for (const entry of entries) {
			const path = join(realDirectory, entry.name);

			if (entry.isDirectory()) {
				await walk(path);
			} else if (entry.isSymbolicLink()) {
				await addLink(path, entry.name);
			} else if (entry.isFile() && isFontFileName(entry.name)) {
				files.add(path);
			}
		}
	};

	const addLink = async (path: string, name: string): Promise<void> => {
		try {
			if ((await stat(path)).isDirectory()) {
				await walk(path);
			} else if (isFontFileName(name)) {
				files.add(await realpath(path));
			}
		} catch {
			// A link whose target is gone.
		}
	};

	for (const directory of directories) {
		await walk(directory);
	}

	return files;
}

function isFontFileName(name: string): boolean {
	return FONT_EXTENSIONS.has(extname(name).toLowerCase());
}

/**
 * Font files Windows has registered from outside its font directories. A value
 * holding a bare file name is one in `%WINDIR%\Fonts`, which is read already.
 * `reg` prints in the console's code page, so a path with a character outside it
 * does not resolve and is skipped.
 */
async function getRegisteredFontFiles(): Promise<string[]> {
	const files: string[] = [];

	for (const key of WINDOWS_FONT_KEYS) {
		let output: string | null;

		try {
			output = await runCommand(`REG QUERY "${key}"`);
		} catch {
			// The per-user key does not exist until a user installs a font.
			continue;
		}

		for (const line of (output ?? '').split(/\r?\n/)) {
			const value = line.match(WINDOWS_FONT_VALUE)?.[1];

			if (value && isAbsolute(value) && isFontFileName(value)) {
				try {
					files.push(await realpath(value));
				} catch {
					// Registered, then removed without being unregistered.
				}
			}
		}
	}

	return files;
}

async function readFontFiles(files: string[]): Promise<FontInfo[]> {
	const faces: FontInfo[][] = [];
	let next = 0;

	const work = async (): Promise<void> => {
		while (next < files.length) {
			const position = next++;

			try {
				faces[position] = await readFontFile(files[position]);
			} catch {
				// Not a font after all, cut short, or not readable by this user.
				faces[position] = [];
			}
		}
	};

	await Promise.all(Array.from({ length: Math.min(MAX_OPEN_FILES, files.length) }, work));

	return faces.flat();
}

function compareFaces(a: FontInfo, b: FontInfo): number {
	return compareText(a.family, b.family) || compareText(a.path, b.path) || a.index - b.index;
}

function compareText(a: string, b: string): number {
	if (a === b) {
		return 0;
	}

	return a < b ? -1 : 1;
}
