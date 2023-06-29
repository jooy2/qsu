import { generateSidebar } from 'vitepress-sidebar';
import { name, description, repository } from '../../../package.json';

export default {
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
			useTitleFromFileHeading: true,
			sortByFileName: ['getting-started.md']
		}),
		socialLinks: [{ icon: 'github', link: repository.url.replace('.git', '') }]
	}
};
