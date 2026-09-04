<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import LangLogo from './LangLogo.vue';
import { codeLanguage, setCodeLanguage } from '../data/language';
import { CODE_LANGUAGES } from '../data/languages';
import { localeOf, t } from '../data/i18n';

// The programming language switch, pinned above the sidebar menu.
//
// It sits there rather than in the navbar because it is not navigation: it does
// not move the reader, it changes what the page they are on says.
//
// A dropdown rather than a row of options, because the row costs the top of
// every sidebar to show the two answers nobody is reading, and it runs out of
// width as soon as qsu ships for a fourth language. What is left is the one part
// that was load-bearing: a control that names the current choice.
//
// The button's face is not rendered from the ref. Every label is inside it and
// CSS displays the chosen one, exactly the way a `::: lang` block works, because
// `<html data-code-lang>` is set before the first paint and a `v-if` cannot run
// before hydration. Rendering it from the ref would announce JavaScript to a
// reader who chose Python for as long as the bundle takes to arrive — on the one
// control whose whole job is to say which package they are reading. The menu is
// `v-if`'d, so it has no server-rendered markup to disagree with and can read
// the ref directly.
const { lang } = useData();
const route = useRoute();
const locale = computed(() => localeOf(lang.value));

const open = ref(false);
const root = ref(null);
const button = ref(null);

/** The options, read off the DOM rather than tracked as an array of refs. */
function optionsOf() {
	return root.value ? [...root.value.querySelectorAll('[role="option"]')] : [];
}

function focusOption(index) {
	const options = optionsOf();

	if (options.length) {
		options[(index + options.length) % options.length].focus();
	}
}

/** Opens on the current choice, which is where a reader expects to land. */
async function openMenu(index) {
	open.value = true;

	await nextTick();

	focusOption(index ?? CODE_LANGUAGES.findIndex((item) => item.id === codeLanguage.value));
}

function closeMenu(refocus = false) {
	if (!open.value) {
		return;
	}

	open.value = false;

	if (refocus) {
		button.value?.focus();
	}
}

function choose(id) {
	setCodeLanguage(id);
	closeMenu(true);
}

function onMenuKey(event) {
	const options = optionsOf();
	const at = options.indexOf(document.activeElement);

	switch (event.key) {
		// A `role="option"` is not activatable on its own account, whatever element
		// it happens to be, so the list answers for it.
		case 'Enter':
		case ' ':
			event.preventDefault();

			if (at >= 0) {
				choose(CODE_LANGUAGES[at].id);
			}

			break;
		case 'ArrowDown':
			event.preventDefault();
			focusOption(at + 1);
			break;
		case 'ArrowUp':
			event.preventDefault();
			focusOption(at - 1);
			break;
		case 'Home':
			event.preventDefault();
			focusOption(0);
			break;
		case 'End':
			event.preventDefault();
			focusOption(options.length - 1);
			break;
		case 'Escape':
			event.preventDefault();
			closeMenu(true);
			break;
		case 'Tab':
			// Not prevented: the focus is meant to leave, the menu is not meant to
			// be left behind open.
			closeMenu();
			break;
	}
}

function onPointerDown(event) {
	if (root.value && !root.value.contains(event.target)) {
		closeMenu();
	}
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown));
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown));

// The sidebar survives a navigation, so without this the menu would too.
watch(
	() => route.path,
	() => closeMenu()
);
</script>

<template>
	<div ref="root" class="lang-switch">
		<p id="lang-switch-label" class="lang-switch-title">{{ t(locale, 'languageLabel') }}</p>

		<button
			ref="button"
			type="button"
			class="lang-switch-button"
			aria-haspopup="listbox"
			:aria-expanded="open"
			aria-labelledby="lang-switch-label lang-switch-current"
			@click="open ? closeMenu() : openMenu()"
			@keydown.down.prevent="openMenu()"
			@keydown.up.prevent="openMenu()"
		>
			<span id="lang-switch-current" class="lang-switch-current">
				<span
					v-for="item in CODE_LANGUAGES"
					:key="item.id"
					class="lang-switch-face lang-only"
					:data-code-lang="item.id"
				>
					<LangLogo :name="item.logo" :width="15" />
					<span>{{ item.label }}</span>
				</span>
			</span>
			<svg class="lang-switch-chevron" viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m6 9 6 6 6-6"
				/>
			</svg>
		</button>

		<div v-if="open" class="lang-switch-menu" @keydown="onMenuKey">
			<!-- The hint is a sibling of the list rather than a child of it: a
			     listbox whose children are not all options is one a screen reader
			     has to guess at. -->
			<div class="lang-switch-list" role="listbox" :aria-label="t(locale, 'languageSelect')">
				<button
					v-for="item in CODE_LANGUAGES"
					:key="item.id"
					type="button"
					role="option"
					class="lang-switch-option"
					:aria-selected="item.id === codeLanguage"
					@click="choose(item.id)"
				>
					<LangLogo :name="item.logo" :width="15" />
					<span class="lang-switch-option-label">{{ item.label }}</span>
					<svg class="lang-switch-check" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="2.4"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m5 12.5 4.5 4.5L19 7"
						/>
					</svg>
				</button>
			</div>

			<p class="lang-switch-hint">{{ t(locale, 'languageHint') }}</p>
		</div>
	</div>
</template>
