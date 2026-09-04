import container from 'markdown-it-container';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type MarkdownRenderer, UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types';
import packageJson from '../../../packages/javascript/package.json' with { type: 'json' };
import { withI18n } from 'vitepress-i18n';
import type { VitePressI18nOptions } from 'vitepress-i18n/types';
import {
	CODE_LANGUAGE_HEAD_SCRIPT,
	CODE_LANGUAGE_IDS,
	displayLanguages,
	languagesOf
} from './data/languages';
import { isLiteral, literalHtml } from './data/types';

const supportedLocale = ['en', 'ko'];
const defaultLocale: string = supportedLocale[0];

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Every `.md` file under `directory`, at any depth. */
function markdownFiles(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);

		if (entry.isDirectory()) {
			return markdownFiles(path);
		}

		return entry.name.endsWith('.md') ? [path] : [];
	});
}

/** The locale-free route of a source file, such as `/reference/os/getCpu`. */
function pageOf(locale: string, path: string): string {
	return `/${relative(join(srcDir, locale), path).replace(/\.md$/, '').split(sep).join('/')}`;
}

/** What a reference page says about itself: its title badge and its blocks. */
function claimsOf(path: string): { badge: string[] | null; blocks: string[] } {
	const source = readFileSync(path, 'utf8');
	const badge = source.match(/^#\s+.*?<Lang\s+([^/>]*)\/>/m);
	const blocks = new Set(
		[...source.matchAll(/^::: lang (.+)$/gm)].flatMap((match) => match[1].trim().split(/\s+/))
	);

	return {
		badge: badge ? CODE_LANGUAGE_IDS.filter((id) => badge[1].split(/\s+/).includes(id)) : null,
		blocks: CODE_LANGUAGE_IDS.filter((id) => blocks.has(id))
	};
}

/**
 * The reference pages that only some of the languages implement, read off the
 * `<Lang />` badge in each page's title.
 *
 * Not every function exists in every package, so the sidebar marks the entries
 * the selected language cannot use and the page says so under its title. Both
 * need the answer for a page they are not currently rendering, which is why it
 * is collected here rather than page by page. The default locale is the source,
 * since the badge says the same thing in every translation.
 *
 * Only the exceptions are listed. A reference page missing from the map is one
 * every language implements, which is most of them and would otherwise be a few
 * kilobytes of "all three" shipped to every reader.
 *
 * The badge is load-bearing, so this is also where it is checked. A page whose
 * badge and `::: lang` blocks disagree, or whose translations disagree with each
 * other, leaves a reader an empty Examples section or an entry the sidebar marks
 * wrongly — and neither shows up in a page you are not looking at. The build
 * refuses; the dev server only complains, so that a page half written is not a
 * page that will not load.
 */
function collectFunctionLanguages(): Record<string, string[]> {
	const languages: Record<string, string[]> = {};
	const problems: string[] = [];

	for (const locale of supportedLocale) {
		for (const path of markdownFiles(join(srcDir, locale, 'reference'))) {
			const page = pageOf(locale, path);
			const { badge, blocks } = claimsOf(path);
			const where = `${locale}${page}.md`;

			if (!badge) {
				if (blocks.length) {
					problems.push(`${where} has ::: lang blocks but no <Lang /> badge in its title.`);
				}

				continue;
			}

			if (badge.join(' ') !== blocks.join(' ')) {
				problems.push(
					`${where}: the title badge says ${badge.join(', ')} but the page has ` +
						`${blocks.length ? `::: lang blocks for ${blocks.join(', ')}` : 'no ::: lang block'}.`
				);
			}

			if (locale === defaultLocale) {
				if (badge.length < CODE_LANGUAGE_IDS.length) {
					languages[page] = badge;
				}

				continue;
			}

			const original = claimsOf(join(srcDir, defaultLocale, `${page.slice(1)}.md`)).badge;

			if (original && badge.join(' ') !== original.join(' ')) {
				problems.push(
					`${where}: the title badge says ${badge.join(', ')} where ` +
						`${defaultLocale}${page}.md says ${original.join(', ')}.`
				);
			}
		}
	}

	if (problems.length) {
		const report = ['The reference pages below disagree with themselves:', ...problems].join(
			'\n  '
		);

		// `vitepress build` against `vitepress dev`. There is no hook that knows
		// which one is running by the time the config is read.
		if (process.argv.includes('build')) {
			throw new Error(report);
		}

		console.warn(report);
	}

	return languages;
}

const functionLanguages = collectFunctionLanguages();

const commonSidebarConfig: VitePressSidebarOptions = {
	debugPrint: true,
	documentRootPath: 'src',
	manualSortFileNameByPriority: ['introduction.md', 'installation.md'],
	hyphenToSpace: true,
	collapsed: false,
	useTitleFromFileHeading: true,
	useTitleFromFrontmatter: true,
	useFolderTitleFromIndexFile: true,
	useFolderLinkFromIndexFile: true,
	useFolderLinkFromSameNameSubFile: true,
	frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
	sortMenusByFrontmatterOrder: true
};

const vitePressSidebarConfigs: VitePressSidebarOptions[] = [
	...supportedLocale.map((lang) => {
		return {
			...commonSidebarConfig,
			documentRootPath: `/src/${lang}`,
			resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
			...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
		};
	})
];

const vitePressI18nConfigs: VitePressI18nOptions = {
	locales: supportedLocale,
	rootLocale: defaultLocale,
	searchProvider: 'local',
	description: {
		en: 'qsu is a utility library that contains useful and frequently used functions. Start with your preferred programming language and the modern development environment.',
		ko: 'qsu는 유용하고 자주 쓰는 함수를 모아둔 유틸리티 라이브러리입니다. 원하는 프로그래밍 언어와 최신 개발 환경에서 시작하세요.'
	},
	themeConfig: {
		en: {
			nav: [
				{ text: 'Getting Started', link: '/installation' },
				{ text: 'Reference', link: '/reference' },
				{ text: 'Changelog', link: '/changelog/' }
			]
		},
		ko: {
			nav: [
				{ text: '시작하기', link: '/ko/installation' },
				{ text: '레퍼런스', link: '/ko/reference' },
				{ text: 'Changelog', link: '/changelog/' }
			]
		}
	}
};

const vitePressConfigs: UserConfig = {
	title: packageJson.name.toUpperCase(),
	lastUpdated: true,
	outDir: '../dist',
	cleanUrls: true,
	metaChunk: true,
	head: [
		['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16.png' }],
		['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
		// Which programming language every page is read in, applied to `<html>`
		// before the first paint. See `data/languages.ts`.
		['script', {}, CODE_LANGUAGE_HEAD_SCRIPT]
	],
	sitemap: {
		hostname: packageJson.homepage
	},
	srcExclude: ['changelog/javascript.md', 'changelog/dart.md', 'changelog/python.md'],
	rewrites: {
		'en/:rest*': ':rest*'
	},
	/**
	 * `::: lang js` … `:::` — the part of a page only one language sees.
	 *
	 * Every language's blocks stay in the document and CSS displays one of them,
	 * which is what makes the switch instant and keeps the two halves from being
	 * two pages that drift apart. A block several languages share is written
	 * `::: lang js python`.
	 *
	 * A page some of the packages do not have shows its first language to the
	 * readers of the ones it lacks, rather than showing them nothing at all —
	 * see `displayLanguages`. The page is `env.relativePath`, which is why this
	 * renderer takes the whole argument list rather than the first two.
	 */
	markdown: {
		config(md: MarkdownRenderer) {
			/**
			 * `` `null` `` in prose, written the way each language writes it.
			 *
			 * A reference page names a value once and every reader gets the word
			 * their own package uses — `None` rather than `null` in Python — so a
			 * sentence does not have to end in "(`None` in Python)" to be true for
			 * everyone. Only the three literals in `data/types.ts` are touched.
			 *
			 * To write one that is not translated, because the sentence really is
			 * about JavaScript's spelling of it, use `<code>` rather than backticks.
			 */
			const renderCode = md.renderer.rules.code_inline;

			md.renderer.rules.code_inline = (tokens, index, options, env, self) => {
				const { content } = tokens[index];

				if (isLiteral(content)) {
					const page = `/${((env as { relativePath?: string }).relativePath ?? '').replace(/\.md$/, '')}`;

					return literalHtml(content, languagesOf(functionLanguages, page));
				}

				if (renderCode) {
					return renderCode(tokens, index, options, env, self);
				}

				return `<code${self.renderAttrs(tokens[index])}>${md.utils.escapeHtml(content)}</code>`;
			};

			md.use(container, 'lang', {
				validate: (params: string) => /^lang(\s+\S+)+$/.test(params.trim()),
				render(
					tokens: { nesting: number; info: string }[],
					index: number,
					_options: unknown,
					env: { relativePath?: string }
				) {
					const token = tokens[index];

					if (token.nesting !== 1) {
						return '</div>\n';
					}

					const wanted = token.info
						.trim()
						.split(/\s+/)
						.slice(1)
						.filter((id) => CODE_LANGUAGE_IDS.includes(id));
					const page = `/${(env.relativePath ?? '').replace(/\.md$/, '')}`;
					const shown = displayLanguages(languagesOf(functionLanguages, page), wanted);

					return `<div class="lang-only" data-code-lang="${shown.join(' ')}">\n`;
				}
			});
		}
	},
	themeConfig: {
		// Read by `LangNotice.vue` and by the sidebar marks in `Layout.vue`.
		functionLanguages,
		siteTitle: false,
		logo: { src: '/logo-text.webp' },
		socialLinks: [
			{ icon: 'github', link: packageJson.repository.url.replace('.git', '') },
			{ icon: 'npm', link: 'https://npmjs.com/package/qsu' },
			{ icon: 'dart', link: 'https://pub.dev/packages/qsu' },
			{ icon: 'pypi', link: 'https://pypi.org/project/qsu' }
		],
		editLink: {
			pattern: 'https://github.com/jooy2/qsu/edit/main/docs/src/:path'
		},
		footer: {
			message: 'Released under the MIT License',
			copyright: '© <a href="https://cdget.com">CDGet</a>'
		}
	}
};

export default defineConfig(
	withSidebar(withI18n(vitePressConfigs, vitePressI18nConfigs), vitePressSidebarConfigs)
);
