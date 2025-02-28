import { defineConfig, UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types';
import packageJson from '../../../package.json' with { type: 'json' };
import { withI18n } from 'vitepress-i18n';
import type { VitePressI18nOptions } from 'vitepress-i18n/types';

const defaultLocale: string = 'en';
const supportedLocale = [defaultLocale, 'ko'];

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
		en: 'qsu is a package of utilities to energize your programming. It is available for JavaScript/Node.js and Dart/Flutter environments.',
		ko: 'qsu 라이브러리는 프로그래밍에 활력을 주는 유틸리티를 모은 패키지입니다. JavaScript/Node.js와 Dart/Flutter 환경에서 사용할 수 있습니다.'
	},
	themeConfig: {
		en: {
			nav: [
				{
					text: 'Getting Started',
					link: 'installation/javascript'
				},
				{
					text: 'Reference',
					link: 'reference'
				}
			]
		},
		ko: {
			nav: [
				{
					text: '시작하기',
					link: 'installation/javascript'
				},
				{
					text: 'Reference',
					link: 'ko/reference'
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
		['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
	],
	sitemap: {
		hostname: packageJson.homepage
	},
	rewrites: {
		'en/:rest*': ':rest*'
	},
	themeConfig: {
		logo: { src: '/logo-32.png', width: 24, height: 24 },
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
