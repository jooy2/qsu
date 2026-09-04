import DefaultTheme from 'vitepress/theme';

import LangLogo from '../components/LangLogo.vue';
import Layout from '../components/Layout.vue';
import NodeRequired from '../components/NodeRequired.vue';
import ParamsTable from '../components/ParamsTable.vue';
import ReturnType from '../components/ReturnType.vue';
import Val from '../components/Val.vue';
import './lang.css';

export default {
	extends: DefaultTheme,
	// Adds the programming language switch above the sidebar menu. Everything
	// else is the default theme.
	Layout,
	enhanceApp({ app }: { app: any }) {
		app.component('LangLogo', LangLogo);
		app.component('NodeRequired', NodeRequired);
		app.component('ParamsTable', ParamsTable);
		app.component('ReturnType', ReturnType);
		app.component('Val', Val);
	}
};
