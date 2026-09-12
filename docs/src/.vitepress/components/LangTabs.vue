<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import LangLogo from './LangLogo.vue';
import { codeLanguage, setCodeLanguage } from '../data/language';
import { CODE_LANGUAGES } from '../data/languages';
import { localeOf, t } from '../data/i18n';

// The programming language switch, for a page that has no sidebar to hold one.
//
// The home layout drops the sidebar, and with it `LangSelect`. So the same
// choice is offered here as a row of three, which is what a page with one
// examples section wants anyway: the reader can see the two options they are
// not reading and take one in a single click.
//
// It writes the same value the sidebar switch does, so a language taken here is
// the language the reference opens in.
//
// Which tab is current is drawn in CSS from `<html data-code-lang>` rather than
// from the ref below, because the attribute is set before the first paint and
// the ref is not. `aria-pressed` still reads the ref: it is corrected on mount,
// before a screen reader has been handed anything to announce.
const { lang } = useData();
const locale = computed(() => localeOf(lang.value));
</script>

<template>
	<div class="lang-tabs" role="group" :aria-label="t(locale, 'languageSelect')">
		<span class="lang-tabs-label">{{ t(locale, 'examplesLanguage') }}</span>

		<span class="lang-tabs-list">
			<button
				v-for="item in CODE_LANGUAGES"
				:key="item.id"
				type="button"
				class="lang-tab"
				:data-code-lang="item.id"
				:aria-pressed="item.id === codeLanguage"
				@click="setCodeLanguage(item.id)"
			>
				<LangLogo :name="item.logo" :width="16" />
				<span>{{ item.label }}</span>
			</button>
		</span>
	</div>
</template>

<style scoped>
.lang-tabs {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 10px 14px;
	margin: 24px 0;
}

.lang-tabs-label {
	font-size: 11px;
	font-weight: 700;
	line-height: 1;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: var(--vp-c-text-3);
}

.lang-tabs-list {
	display: flex;
	gap: 4px;
	padding: 4px;
	border: 1px solid var(--vp-c-divider);
	border-radius: 10px;
	background-color: var(--vp-c-bg-alt);
}

.lang-tab {
	display: flex;
	align-items: center;
	gap: 7px;
	padding: 6px 12px;
	border-radius: 7px;
	color: var(--vp-c-text-2);
	font-size: 13px;
	font-weight: 600;
	line-height: 1;
	cursor: pointer;
	transition:
		color 0.16s,
		background-color 0.16s;
}

.lang-tab:hover {
	color: var(--vp-c-text-1);
}

.lang-tab:focus-visible {
	outline: 2px solid var(--vp-c-brand-1);
	outline-offset: 1px;
}

/* Quiet until its language is the one being read, so the row says which package
   the examples below belong to without a second glance. */
.lang-tab img {
	opacity: 0.55;
	transition: opacity 0.16s;
}

.lang-tab:hover img {
	opacity: 1;
}

/* The current tab, written out per language for the reason the same rule in
   `lang.css` is: there is no way to say "the one the document is set to". */
html[data-code-lang='js'] .lang-tab[data-code-lang='js'],
html[data-code-lang='dart'] .lang-tab[data-code-lang='dart'],
html[data-code-lang='python'] .lang-tab[data-code-lang='python'] {
	background-color: var(--vp-c-bg);
	box-shadow: var(--vp-shadow-1);
	color: var(--vp-c-brand-1);
}

html[data-code-lang='js'] .lang-tab[data-code-lang='js'] img,
html[data-code-lang='dart'] .lang-tab[data-code-lang='dart'] img,
html[data-code-lang='python'] .lang-tab[data-code-lang='python'] img {
	opacity: 1;
}
</style>
