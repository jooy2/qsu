import { defineConfig } from 'vitepress';
import { generateSidebar, VitePressSidebarOptions } from 'vitepress-sidebar';
import { name, homepage } from '../../../package.json';

const defaultLocale: string = 'en';

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
		search: {
			provider: 'local'
		},
		footer: {
			message: 'Released under the MIT License',
			copyright: '© <a href="https://cdget.com">CDGet</a>'
		}
	},
	locales: {
		root: {
			label: 'English',
			lang: 'en-US',
			description:
				'VitePress Sidebar is a VitePress plugin that automatically generates sidebar menus with one setup and no hassle. Save time by easily creating taxonomies for tons of articles.',
			themeConfig: {
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
		},
		ko: {
			label: '한국어',
			lang: 'ko-KR',
			description:
				'VitePress Sidebar는 번거로운 작업 없이 한번의 설정만으로 사이드바 메뉴를 자동으로 생성하는 VitePress 플러그인입니다. 수많은 문서에 대한 분류를 손쉽게 만들어 시간을 절약하세요.',
			themeConfig: {
				nav: [
					{
						text: 'JavaScript',
						link: 'js/installation'
					},
					{
						text: 'Dart',
						link: 'dart/installation'
					}
				],
				docFooter: {
					prev: '이전',
					next: '다음'
				},
				outline: {
					label: '이 페이지 콘텐츠'
				},
				lastUpdated: {
					text: '업데이트 일자'
				},
				langMenuLabel: '언어 변경',
				returnToTopLabel: '맨 위로',
				sidebarMenuLabel: '사이드바 메뉴',
				darkModeSwitchLabel: '다크 모드',
				lightModeSwitchTitle: '라이트 모드로 변경',
				darkModeSwitchTitle: '다크 모드로 변경'
			}
		}
	},
	search: {
		provider: 'local',
		options: {
			locales: {
				ko: {
					translations: {
						button: {
							buttonText: '검색',
							buttonAriaLabel: '검색'
						},
						modal: {
							displayDetails: '상세 목록 표시',
							resetButtonTitle: '검색 초기화',
							backButtonTitle: '검색 닫기',
							noResultsText: '결과를 찾을 수 없음',
							footer: {
								selectText: '선택',
								selectKeyAriaLabel: '선택하기',
								navigateText: '탐색',
								navigateUpKeyAriaLabel: '위로',
								navigateDownKeyAriaLabel: '아래로',
								closeText: '닫기',
								closeKeyAriaLabel: 'esc'
							}
						}
					}
				}
			}
		}
	}
});
