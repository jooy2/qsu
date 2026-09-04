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

const supportedLocale = ['en', 'ko'];
const defaultLocale: string = supportedLocale[0];

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
 * kilobytes of "all three" shipped to every reader. Keys are locale-free paths,
 * such as `/reference/os/getCpu`.
 */
function collectFunctionLanguages(): Record<string, string[]> {
	const root = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), defaultLocale);
	const languages: Record<string, string[]> = {};

	const walk = (directory: string): void => {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);

			if (entry.isDirectory()) {
				walk(path);
				continue;
			}

			if (!entry.name.endsWith('.md')) {
				continue;
			}

			const badge = readFileSync(path, 'utf8').match(/^#\s+.*?<Lang\s+([^/>]*)\/>/m);

			if (!badge) {
				continue;
			}

			const wanted = badge[1].trim().split(/\s+/);
			const implemented = CODE_LANGUAGE_IDS.filter((id) => wanted.includes(id));

			if (implemented.length === CODE_LANGUAGE_IDS.length) {
				continue;
			}

			languages[`/${relative(root, path).replace(/\.md$/, '').split(sep).join('/')}`] = implemented;
		}
	};

	walk(join(root, 'reference'));

	return languages;
}

const functionLanguages = collectFunctionLanguages();

const commonSidebarConfig: VitePressSidebarOptions = {
	debugPrint: true,
	documentRootPath: 'src',
	manualSortFileNameByPriority: ['introduction.md', 'installation'],
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
				{
					text: 'Getting Started',
					items: [
						{ text: 'JavaScript', link: '/installation/javascript' },
						{ text: 'Dart', link: '/installation/dart' },
						{ text: 'Python', link: '/installation/python' }
					]
				},
				{
					text: 'Reference',
					link: 'reference'
				},
				{
					text: 'Changelog',
					items: [
						{ text: 'JavaScript', link: '/changelog/javascript' },
						{ text: 'Dart', link: '/changelog/dart' },
						{ text: 'Python', link: '/changelog/python' }
					]
				}
			]
		},
		ko: {
			nav: [
				{
					text: '시작하기',
					items: [
						{ text: 'JavaScript', link: '/ko/installation/javascript' },
						{ text: 'Dart', link: '/ko/installation/dart' },
						{ text: 'Python', link: '/ko/installation/python' }
					]
				},
				{
					text: '레퍼런스',
					link: 'ko/reference'
				},
				{
					text: 'Changelog',
					items: [
						{ text: 'JavaScript', link: '/changelog/javascript' },
						{ text: 'Dart', link: '/changelog/dart' },
						{ text: 'Python', link: '/changelog/python' }
					]
				}
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
	rewrites: {
		'en/:rest*': ':rest*'
	},
	/**
	 * `::: lang js` … `:::` — the part of a page only one language sees.
	 *
	 * Every language's blocks stay in the document and CSS displays one of them,
	 * which is what makes the switch instant and keeps the search index complete.
	 * A block several languages share is written `::: lang js python`.
	 *
	 * A page some of the packages do not have shows its first language to the
	 * readers of the ones it lacks, rather than showing them nothing at all —
	 * see `displayLanguages`. The page is `env.relativePath`, which is why this
	 * renderer takes the whole argument list rather than the first two.
	 */
	markdown: {
		config(md: MarkdownRenderer) {
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
			{ icon: 'dart', link: 'https://pub.dev/packages/qsu' }
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
