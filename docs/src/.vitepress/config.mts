import { defineConfig, UserConfig } from 'vitepress';
import { withSidebar, VitePressSidebarOptions } from 'vitepress-sidebar';
import { name, homepage } from '../../../package.json';
import { withI18n } from 'vitepress-i18n';
import { VitePressI18nOptions } from 'vitepress-i18n/dist/types';

const defaultLocale: string = 'en';

const commonSidebarConfig: VitePressSidebarOptions = {
	debugPrint: true,
	documentRootPath: 'src',
	manualSortFileNameByPriority: ['introduction.md', 'getting-started', 'installation.md'],
	hyphenToSpace: true,
	collapsed: false,
	capitalizeFirst: true,
	capitalizeEachWords: true,
	useTitleFromFileHeading: true,
	useTitleFromFrontmatter: true,
	useFolderTitleFromIndexFile: true,
	useFolderLinkFromIndexFile: true,
	useFolderLinkFromSameNameSubFile: true,
	frontmatterOrderDefaultValue: 9, // For 'CHANGELOG.md'
	sortMenusByFrontmatterOrder: true
};

const vitePressSidebarConfigs: VitePressSidebarOptions[] = [
	...[defaultLocale, 'ko'].map((lang) => {
		return {
			...commonSidebarConfig,
			documentRootPath: `/src/${lang}`,
			resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
			...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
		};
	})
];

const vitePressI18nConfigs: VitePressI18nOptions = {
	locales: [defaultLocale, 'ko'],
	rootLocale: defaultLocale,
	searchProvider: 'local',
	description: {
		en: 'QSU is a package of utilities to energize your programming. It is available for JavaScript/Node.js and Dart/Flutter environments.',
		ko: 'QSU는 프로그래밍에 활력을 주는 유틸리티를 모은 패키지입니다. JavaScript/Node.js와 Dart/Flutter 환경에서 사용할 수 있습니다.'
	},
	themeConfig: {
		en: {
			nav: [
				{
					text: 'JavaScript',
					link: 'getting-started/installation-javascript'
				},
				{
					text: 'Dart',
					link: 'getting-started/installation-dart'
				},
				{
					text: 'API',
					link: 'api'
				}
			]
		},
		ko: {
			nav: [
				{
					text: 'JavaScript',
					link: 'ko/getting-started/installation-javascript'
				},
				{
					text: 'Dart',
					link: 'ko/getting-started/installation-dart'
				},
				{
					text: 'API',
					link: 'ko/api'
				}
			]
		}
	}
};

const vitePressConfigs: UserConfig = {
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
		editLink: {
			pattern: 'https://github.com/jooy2/qsu/edit/master/docs/src/:path'
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
