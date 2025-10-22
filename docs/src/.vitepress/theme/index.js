import DefaultTheme from 'vitepress/theme';

import './custom.css';
import Lang from '../components/Lang.vue';
import LangLogo from '../components/LangLogo.vue';
import NodeRequired from '../components/NodeRequired.vue';
import DartNamed from '../components/DartNamed.vue';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('Lang', Lang);
		app.component('LangLogo', LangLogo);
		app.component('NodeRequired', NodeRequired);
		app.component('DartNamed', DartNamed);
	}
};
