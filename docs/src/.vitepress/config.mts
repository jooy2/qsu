import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';
import { name, description, repository } from '../../../package.json';

export default defineConfig({
	title: name.toUpperCase(),
	description,
	outDir: '../dist',
	head: [
		['link', { rel: 'icon', href: '/logo.png' }],
		['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
	],
	cleanUrls: true,
	themeConfig: {
		search: {
			provider: 'local'
		},
		sidebar: generateSidebar({
			documentRootPath: 'src',
			collapsed: false,
			capitalizeEachWords: true,
			hyphenToSpace: true,
			useTitleFromFileHeading: true,
			useTitleFromFrontmatter: true,
			useFolderTitleFromIndexFile: true,
			sortMenusByFrontmatterOrder: true
		}),
		socialLinks: [{ icon: 'github', link: repository.url.replace('.git', '') }]
	}
});
