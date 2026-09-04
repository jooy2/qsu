<script setup>
import DefaultTheme from 'vitepress/theme';
import { onContentUpdated, useData } from 'vitepress';
import { computed, nextTick, onMounted, watch } from 'vue';
import LangNotice from './LangNotice.vue';
import LangSelect from './LangSelect.vue';
import { codeLanguage, syncCodeLanguage } from '../data/language';
import { CODE_LANGUAGES, languagesOf } from '../data/languages';
import { list, localeOf, t } from '../data/i18n';

// The default layout, plus the two things the language switch needs from the
// chrome around a page: the switch itself above the sidebar menu, and the notice
// above a function the selected language does not implement.
//
// The rest of this file is what the default theme renders from data rather than
// from the DOM, and so cannot see a `::: lang` block: the sidebar entries and
// "On this page". Both are corrected after each render.
const { Layout } = DefaultTheme;

const { lang, theme } = useData();
const locale = computed(() => localeOf(lang.value));

/**
 * Marks the sidebar entries the selected language cannot use.
 *
 * The default theme has no slot inside a sidebar item, so the mark is a class
 * and a `data-lang-badge` attribute written onto the rendered link; `lang.css`
 * draws the badge from the attribute. Re-applied whenever the page or the
 * language changes, which is also when the sidebar rebuilds itself.
 */
function syncSidebar() {
	const implemented = theme.value.functionLanguages;

	if (!implemented) {
		return;
	}

	for (const link of document.querySelectorAll('.VPSidebarItem .link')) {
		const languages = languagesOf(implemented, link.getAttribute('href') ?? '');
		const missing = Boolean(languages) && !languages.includes(codeLanguage.value);
		const text = link.querySelector('.text');

		link.classList.toggle('lang-unavailable', missing);

		if (!missing) {
			link.removeAttribute('title');
			text?.removeAttribute('data-lang-badge');
			continue;
		}

		const named = CODE_LANGUAGES.filter((item) => languages.includes(item.id));

		link.setAttribute(
			'title',
			t(locale.value, 'unavailableLink', {
				language: CODE_LANGUAGES.find((item) => item.id === codeLanguage.value)?.label ?? '',
				languages: list(
					locale.value,
					named.map((item) => item.label)
				)
			})
		);
		text?.setAttribute('data-lang-badge', named.map((item) => item.short).join(' · '));
	}
}

function syncOutline() {
	const doc = document.querySelector('.vp-doc');

	if (!doc) {
		return;
	}

	for (const link of document.querySelectorAll('.outline-link')) {
		const id = decodeURIComponent(link.getAttribute('href')?.slice(1) ?? '');
		const heading = id ? doc.querySelector(`[id="${CSS.escape(id)}"]`) : null;
		const block = heading?.closest('.lang-only');
		const hidden =
			Boolean(block) && !block.dataset.codeLang.split(' ').includes(codeLanguage.value);

		(link.closest('li') ?? link).classList.toggle('lang-hidden', hidden);
	}
}

function sync() {
	syncOutline();
	syncSidebar();
}

// Reading the stored choice here rather than in `enhanceApp` keeps the first
// client render identical to the pre-rendered markup.
onMounted(() => {
	syncCodeLanguage();
	nextTick(sync);
});

// `onContentUpdated` is the hook the outline itself is built on, so it fires on
// the first render and on every navigation.
onContentUpdated(() => nextTick(sync));

// And again when the reader switches language, which changes which half of the
// page exists without changing the page.
watch(codeLanguage, () => nextTick(sync));
</script>

<template>
	<Layout>
		<template #sidebar-nav-before>
			<LangSelect />
		</template>
		<template #doc-before>
			<LangNotice />
		</template>
	</Layout>
</template>
