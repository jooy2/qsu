import { defineConfig } from 'vitepress';
import { generateSidebar, VitePressSidebarOptions } from 'vitepress-sidebar';
import { name, homepage } from '../../../package.json';
import { generateI18nLocale, generateI18nSearch } from 'vitepress-i18n';

const defaultLocale: string = 'en';
const editLinkPattern = 'https://github.com/jooy2/qsu/edit/master/docs/:path';

const commonSidebarConfig: VitePressSidebarOptions = {
	debugPrint: true,
	documentRootPath: 'src',
	manualSortFileNameByPriority: ['introduction.md', 'js', 'dart', 'installation.md'],
	collapsed: false,
	capitalizeFirst: true,
	capitalizeEachWords: true,
	useTitleFromFileHeading: true,
	useTitleFromFrontmatter: true,
	useFolderTitleFromIndexFile: true,
	useFolderLinkFromIndexFile: true,
	convertSameNameSubFileToGroupIndexPage: true,
	frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
	sortMenusByFrontmatterOrder: true
};

const defineSupportLocales = [
	{ label: defaultLocale, translateLocale: defaultLocale },
	{ label: 'ko', translateLocale: 'ko' }
];

export default defineConfig({
	title: name.toUpperCase(),
	lastUpdated: true,
	outDir: '../dist',
	cleanUrls: true,
	metaChunk: true,
	head: [
		['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16.png' }],
		['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
	],
	sitemap: {
		hostname: homepage
	},
	rewrites: {
		'en/:rest*': ':rest*'
	},
	themeConfig: {
		logo: { src: '/logo-32.png', width: 24, height: 24 },
		sidebar: generateSidebar([
			...[defaultLocale, 'ko'].map((lang) => {
				return {
					...commonSidebarConfig,
					documentRootPath: `/src/${lang}`,
					resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
					...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
				};
			})
		]),
		footer: {
			message: 'Released under the MIT License',
			copyright: '© <a href="https://cdget.com">CDGet</a>'
		}
	},

	locales: generateI18nLocale({
		defineLocales: defineSupportLocales,
		rootLocale: defaultLocale,
		editLinkPattern: editLinkPattern,
		label: {
			en: 'English',
			ko: '한국어'
		},
		lang: {
			en: 'en-US',
			ko: 'ko-KR'
		},
		description: {
			en: 'QSU is a package of utilities to energize your programming. It is available for JavaScript/Node.js and Dart/Flutter environments.',
			ko: 'QSU는 프로그래밍에 활력을 주는 유틸리티를 모은 패키지입니다. JavaScript/Node.js와 Dart/Flutter 환경에서 사용할 수 있습니다.'
		},
		themeConfig: {
			en: {
				nav: [
					{
						text: 'JavaScript',
						link: 'js/installation'
					},
					{
						text: 'Dart',
						link: 'dart/installation'
					}
				]
			},
			ko: {
				nav: [
					{
						text: 'JavaScript',
						link: 'js/installation'
					},
					{
						text: 'Dart',
						link: 'dart/installation'
					}
				]
			}
		}
	}),
	search: generateI18nSearch({
		defineLocales: defineSupportLocales,
		rootLocale: defaultLocale,
		provider: 'local'
	})
});
