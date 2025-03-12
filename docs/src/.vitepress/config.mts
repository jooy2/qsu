import { defineConfig, UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types';
import packageJson from '../../../packages/javascript/package.json' with { type: 'json' };
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
		en: 'qsu is a utility library that contains useful and frequently used functions. Start with your preferred programming language and the modern development environment.',
		ko: 'qsu는 유용하고 자주 쓰는 함수를 모아둔 유틸리티 라이브러리입니다. 원하는 프로그래밍 언어와 최신 개발 환경에서 시작하세요.'
	},
	themeConfig: {
		en: {
			nav: [
				{
					text: 'Getting Started',
					link: 'installation'
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
					link: 'ko/installation'
				},
				{
					text: '레퍼런스',
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
