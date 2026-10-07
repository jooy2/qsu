/**
 * The body of a GitHub release, cut out of one package's `CHANGELOG.md`.
 *
 *   node .github/scripts/release-notes.mjs javascript-v1.21.0 > notes.md
 *
 * The three packages version on their own, so a tag names the package as well
 * as the version: `javascript-v1.21.0`, `dart-v1.9.0` or `python-v1.6.0`.
 *
 * Nothing is written for a tag the package was not cut for. Every file that
 * carries the package's version has to name the tag's version, and the
 * changelog section for it has to be dated and not empty. A tag pushed onto
 * the wrong commit, or a version raised in one file and not in the next, stops
 * here rather than publishing a release that describes something else.
 */
import { readFileSync } from 'node:fs';
import { dirname, posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPOSITORY_URL = 'https://github.com/jooy2/qsu';
// GitHub cuts a release body off at this many characters, in the middle of
// whatever entry it reaches.
const BODY_LIMIT = 125000;
const VERSION_PATTERN = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

const readMatch = (pattern) => (text) => [text.match(pattern)?.[1]];

/**
 * Every package, by the name its tags start with. `versions` maps each file
 * that carries the version, relative to `dir`, to a reader that returns every
 * version written in it.
 */
const PACKAGES = {
	javascript: {
		dir: 'packages/javascript',
		versions: {
			'package.json': (text) => [JSON.parse(text).version],
			// The lock file names the version twice: its own and the root package's.
			'package-lock.json': (text) => {
				const lock = JSON.parse(text);

				return [lock.version, lock.packages?.['']?.version];
			}
		}
	},
	dart: {
		dir: 'packages/dart',
		versions: {
			'pubspec.yaml': readMatch(/^version:\s*(\S+)/m)
		}
	},
	python: {
		dir: 'packages/python',
		versions: {
			'pyproject.toml': readMatch(/^version\s*=\s*"([^"]+)"/m),
			'qsu/__init__.py': readMatch(/^__version__\s*=\s*['"]([^'"]+)['"]/m)
		}
	}
};

const fail = (message) => {
	process.stderr.write(`release-notes: ${message}\n`);
	process.exit(1);
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const tag = process.argv[2] ?? '';
const [, name, version] = tag.match(/^([a-z]+)-v(.+)$/) ?? [];

if (!Object.hasOwn(PACKAGES, name ?? '') || !VERSION_PATTERN.test(version)) {
	const examples = Object.keys(PACKAGES).map((key) => `${key}-v1.2.0`);

	fail(`"${tag}" is not a tag such as ${examples.join(', ')}`);
}

const { dir, versions } = PACKAGES[name];

for (const [file, read] of Object.entries(versions)) {
	const path = posix.join(dir, file);
	const others = read(readFileSync(resolve(root, path), 'utf8')).filter(
		(value) => value !== version
	);

	if (others.length > 0) {
		const found = others.map((value) => value ?? 'no version').join(' and ');

		fail(`${path} names ${found} where the tag names ${version}. Tag the commit that cut ${tag}.`);
	}
}

const changelogPath = posix.join(dir, 'CHANGELOG.md');
const lines = readFileSync(resolve(root, changelogPath), 'utf8').split(/\r?\n/);
const start = lines.findIndex(
	(line) => line === `## ${version}` || line.startsWith(`## ${version} `)
);

if (start === -1) {
	fail(`${changelogPath} has no "## ${version}" section`);
}

if (!/^## \S+ \(\d{4}-\d{2}-\d{2}\)$/.test(lines[start])) {
	fail(`"${lines[start]}" in ${changelogPath} is not dated as "## ${version} (YYYY-MM-DD)"`);
}

const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));
const section = lines
	.slice(start + 1, end === -1 ? undefined : end)
	.join('\n')
	.trim();

if (section === '') {
	fail(`the ${version} section of ${changelogPath} is empty`);
}

const changelogLink = `[\`${changelogPath}\`](${REPOSITORY_URL}/blob/${tag}/${changelogPath})`;
const pointer = `Every release of this package is described in ${changelogLink}.`;
const body = `${section}\n\n---\n\n${pointer}\n`;

process.stdout.write(
	body.length <= BODY_LIMIT
		? body
		: `The list of changes is too long for a release page. ${pointer}\n`
);
