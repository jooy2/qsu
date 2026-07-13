import DefaultTheme from 'vitepress/theme';

import Lang from '../components/Lang.vue';
import LangLogo from '../components/LangLogo.vue';
import NodeRequired from '../components/NodeRequired.vue';
import ParamsTable from '../components/ParamsTable.vue';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }: { app: any }) {
		app.component('Lang', Lang);
		app.component('LangLogo', LangLogo);
		app.component('NodeRequired', NodeRequired);
		app.component('ParamsTable', ParamsTable);
	}
};
