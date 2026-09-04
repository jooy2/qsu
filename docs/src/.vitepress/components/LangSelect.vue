<script setup>
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import LangLogo from './LangLogo.vue';
import { codeLanguage, setCodeLanguage } from '../data/language';
import { CODE_LANGUAGES } from '../data/languages';
import { localeOf, t } from '../data/i18n';

// The programming language switch, pinned above the sidebar menu.
//
// It sits there rather than in the navbar because it is not navigation: it does
// not move the reader, it changes what the page they are on says.
//
// Which option looks selected is decided by CSS from `<html data-code-lang>`,
// not by the ref. The attribute is set by an inline script before the first
// paint, so a pre-rendered page shows the right answer before any of this has
// run. The ref only drives `aria-checked` and the focus order, which settle at
// hydration.
const { lang } = useData();
const locale = computed(() => localeOf(lang.value));

const track = ref(null);

function focusOption(index) {
	const options = track.value ? [...track.value.querySelectorAll('[role="radio"]')] : [];

	if (options.length) {
		options[(index + options.length) % options.length].focus();
	}
}

// Arrow keys move between the options and select as they go, which is how a
// radio group is expected to behave.
function onKey(event, index) {
	const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];

	if (step === undefined) {
		return;
	}

	event.preventDefault();

	const next = (index + step + CODE_LANGUAGES.length) % CODE_LANGUAGES.length;

	setCodeLanguage(CODE_LANGUAGES[next].id);
	focusOption(next);
}
</script>

<template>
	<div class="lang-switch">
		<p class="lang-switch-title">{{ t(locale, 'languageLabel') }}</p>

		<div
			ref="track"
			class="lang-switch-track"
			role="radiogroup"
			:aria-label="t(locale, 'languageSelect')"
		>
			<button
				v-for="(item, index) in CODE_LANGUAGES"
				:key="item.id"
				type="button"
				role="radio"
				class="lang-switch-option"
				:data-code-lang="item.id"
				:aria-checked="item.id === codeLanguage"
				:tabindex="item.id === codeLanguage ? 0 : -1"
				:title="item.label"
				@click="setCodeLanguage(item.id)"
				@keydown="onKey($event, index)"
			>
				<LangLogo :name="item.logo" :width="14" />
				<span>{{ item.short }}</span>
			</button>
		</div>

		<p class="lang-switch-hint">{{ t(locale, 'languageHint') }}</p>
	</div>
</template>
