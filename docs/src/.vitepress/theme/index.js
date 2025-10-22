import DefaultTheme from 'vitepress/theme';

import './custom.css';
import Lang from '../components/Lang.vue';
import NodeRequired from '../components/NodeRequired.vue';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('Lang', Lang);
		app.component('NodeRequired', NodeRequired);
	}
};
