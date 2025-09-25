import DefaultTheme from 'vitepress/theme';

import './custom.css';
import SupportLang from '../components/SupportLang.vue';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('SupportLang', SupportLang);
	}
};
