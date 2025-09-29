import DefaultTheme from 'vitepress/theme';

import './custom.css';
import Lang from '../components/Lang.vue';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('Lang', Lang);
	}
};
