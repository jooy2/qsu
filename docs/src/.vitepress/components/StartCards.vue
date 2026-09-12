<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import LangLogo from './LangLogo.vue';
import { setCodeLanguage } from '../data/language';
import { CODE_LANGUAGES } from '../data/languages';
import { localeOf, t } from '../data/i18n';

// Where the home page ends: pick the language you write in, and open the
// installation page already reading that package.
//
// Taking a card is the same choice the switch makes, so it is stored the same
// way. A reader who arrives on `installation` from here finds its commands, its
// runtime requirement and its import examples written for the language they
// just took, and so does every page they open afterwards.
//
// The card is one link rather than a card with links inside it, both because the
// whole surface should be takeable and because a link inside a link is not
// something a browser or a screen reader can make sense of.
const props = defineProps({
	cards: {
		type: Array,
		required: true
	}
});

const { lang } = useData();
const locale = computed(() => localeOf(lang.value));

const cards = computed(() =>
	props.cards.flatMap((card) => {
		const language = CODE_LANGUAGES.find((item) => item.id === card.id);

		return language ? [{ ...card, label: language.label, logo: language.logo }] : [];
	})
);
</script>

<template>
	<div class="start-cards">
		<a
			v-for="card in cards"
			:key="card.id"
			class="start-card"
			:href="withBase(card.link)"
			:data-code-lang="card.id"
			@click="setCodeLanguage(card.id)"
		>
			<span class="start-head">
				<LangLogo :name="card.logo" :width="26" />
				<span class="start-name">{{ card.label }}</span>
			</span>
			<span class="start-note">{{ card.note }}</span>
			<span class="start-install">{{ card.install }}</span>
			<span class="start-action">
				{{ t(locale, 'startAction') }}
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5 12h13m-5-6 6 6-6 6"
					/>
				</svg>
			</span>
		</a>
	</div>
</template>

<style scoped>
.start-cards {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 16px;
	margin: 24px 0;
}

.start-card {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 24px;
	border: 1px solid var(--vp-c-divider);
	border-radius: 14px;
	background-color: var(--vp-c-bg-soft);
	font-weight: 400;
	text-decoration: none;
	transition:
		border-color 0.25s,
		background-color 0.25s,
		transform 0.25s;
}

.start-card:hover {
	border-color: var(--vp-c-brand-1);
	background-color: var(--vp-c-bg-elv);
	transform: translateY(-3px);
}

@media (prefers-reduced-motion: reduce) {
	.start-card:hover {
		transform: none;
	}
}

/* The card for the language the site is currently being read in. The reader
   chose it once already, so the row says which one that was. */
html[data-code-lang='js'] .start-card[data-code-lang='js'],
html[data-code-lang='dart'] .start-card[data-code-lang='dart'],
html[data-code-lang='python'] .start-card[data-code-lang='python'] {
	border-color: var(--vp-c-brand-1);
}

.start-head {
	display: flex;
	align-items: center;
	gap: 10px;
}

.start-name {
	font-size: 18px;
	font-weight: 700;
	line-height: 1.2;
	color: var(--vp-c-text-1);
}

.start-note {
	font-size: 13px;
	line-height: 1.6;
	color: var(--vp-c-text-2);
}

.start-install {
	padding: 8px 12px;
	border-radius: 8px;
	background-color: var(--vp-c-bg-alt);
	font-family: var(--vp-font-family-mono);
	font-size: 13px;
	color: var(--vp-c-text-1);
	overflow-x: auto;
	white-space: nowrap;
}

.start-action {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-top: auto;
	padding-top: 4px;
	font-size: 14px;
	font-weight: 600;
	color: var(--vp-c-brand-1);
}

.start-action svg {
	width: 15px;
	height: 15px;
	transition: transform 0.25s;
}

.start-card:hover .start-action svg {
	transform: translateX(3px);
}

@media (prefers-reduced-motion: reduce) {
	.start-card:hover .start-action svg {
		transform: none;
	}
}
</style>
