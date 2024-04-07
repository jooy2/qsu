import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';
import { name, homepage, description, repository } from '../../../package.json';

export default defineConfig({
	title: name.toUpperCase(),
	description,
	outDir: '../dist',
	cleanUrls: true,
	head: [
		['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16.png' }],
		['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
	],
	sitemap: {
		hostname: homepage
	},
	themeConfig: {
		logo: { src: '/logo-32.png', width: 24, height: 24 },
		sidebar: generateSidebar({
			documentRootPath: 'src',
			collapsed: false,
			capitalizeEachWords: true,
			hyphenToSpace: true,
			useTitleFromFileHeading: true,
			useTitleFromFrontmatter: true,
			sortMenusByFrontmatterOrder: true,
			excludeFiles: ['changelog.md']
		}),
		search: {
			provider: 'local'
		},
		nav: [
			{
				text: 'Installation',
				link: 'getting-started/installation'
			},
			{
				text: 'Changelog',
				link: 'changelog'
			}
		],
		socialLinks: [
			{ icon: 'npm', link: 'https://www.npmjs.com/package/qsu' },
			{ icon: 'github', link: repository.url.replace('.git', '') }
		],
		footer: {
			message: 'Released under the MIT License',
			copyright: '© <a href="https://jooy2.com">Jooy2</a>'
		}
	}
});
