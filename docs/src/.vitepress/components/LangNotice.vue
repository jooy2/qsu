<script setup>
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { CODE_LANGUAGES, languagesOf } from '../data/languages';
import { list, localeOf, t } from '../data/i18n';

// The banner shown above a function the selected language does not implement.
//
// One banner is rendered for each language the page is missing and CSS displays
// the one that applies, the same way a `::: lang` block works. Rendering only
// the current language's banner would mean an element appearing after hydration
// on every page a reader visits outside their language.
const { lang, theme } = useData();
const route = useRoute();
const locale = computed(() => localeOf(lang.value));

// `functionLanguages` lists only the pages that are not implemented everywhere,
// so an absent page is one every language has. See `config.mts`.
const implemented = computed(() => languagesOf(theme.value.functionLanguages, route.path));

const missing = computed(() =>
	CODE_LANGUAGES.filter((item) => implemented.value && !implemented.value.includes(item.id))
);

const labelsOf = (ids) =>
	list(
		locale.value,
		CODE_LANGUAGES.filter((item) => ids.includes(item.id)).map((item) => item.label)
	);
</script>

<template>
	<div
		v-for="item in missing"
		:key="item.id"
		class="lang-notice"
		:data-code-lang="item.id"
		role="note"
	>
		<strong>{{ t(locale, 'unavailableTitle', { language: item.label }) }}</strong>
		<span>{{
			t(locale, 'unavailableBody', {
				language: item.label,
				languages: labelsOf(implemented)
			})
		}}</span>
	</div>
</template>
