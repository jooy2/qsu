<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { CODE_LANGUAGES, variantsOf } from '../data/languages';
import { localeOf, t } from '../data/i18n';

// The catalogue on the home page: every category, and how much of it the
// selected language can use.
//
// The numbers are not written here. `categoryCounts` is counted from the
// reference pages while the site builds, so the grid cannot fall behind the
// packages it describes, and a category a package does not have counts zero and
// says so rather than showing a confident `0`.
//
// Only the descriptions come from the page, because those are the part that is
// written in a human language. The category names are the folder names the
// sidebar and the URLs already use, so every locale reads the same word.
//
// Every language's number is in the document at once and CSS displays one, the
// way a `::: lang` block works. See `lang.css`.
const props = defineProps({
	rows: {
		type: Array,
		required: true
	}
});

const { lang, theme } = useData();
const locale = computed(() => localeOf(lang.value));
const counts = computed(() => theme.value.categoryCounts ?? {});

function labelOf(language) {
	return CODE_LANGUAGES.find((item) => item.id === language)?.label ?? '';
}

function countIn(category, language) {
	return counts.value[category]?.[language] ?? 0;
}

function countText(category, language) {
	const count = countIn(category, language);

	if (count === 0) {
		return t(locale.value, 'categoryUnavailable', { language: labelOf(language) });
	}

	return t(locale.value, count === 1 ? 'functionCountOne' : 'functionCount', {
		count: String(count)
	});
}

const cards = computed(() =>
	props.rows.map((row) => ({
		name: row.name,
		desc: row.desc,
		counts: variantsOf(null, (language) => countText(row.name, language))
	}))
);

/** What the whole catalogue adds up to, for the language being read. */
const summary = computed(() =>
	variantsOf(null, (language) => {
		const categories = props.rows.filter((row) => countIn(row.name, language) > 0);
		const total = categories.reduce((sum, row) => sum + countIn(row.name, language), 0);

		return t(locale.value, 'categorySummary', {
			count: String(total),
			categories: String(categories.length)
		});
	})
);
</script>

<template>
	<div class="category-grid">
		<div v-for="card in cards" :key="card.name" class="category-card">
			<p class="category-name">{{ card.name }}</p>
			<p class="category-count">
				<span
					v-for="variant in card.counts"
					:key="variant.text"
					class="lang-only"
					:data-code-lang="variant.languages.join(' ')"
					>{{ variant.text }}</span
				>
			</p>
			<p class="category-desc">{{ card.desc }}</p>
		</div>
	</div>

	<p class="category-summary">
		<span
			v-for="variant in summary"
			:key="variant.text"
			class="lang-only"
			:data-code-lang="variant.languages.join(' ')"
			>{{ variant.text }}</span
		>
	</p>
</template>

<style scoped>
.category-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	gap: 12px;
	margin: 24px 0 16px;
}

.category-card {
	padding: 16px 18px;
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	background-color: var(--vp-c-bg-soft);
	transition:
		border-color 0.25s,
		transform 0.25s;
}

.category-card:hover {
	border-color: var(--vp-c-brand-1);
	transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
	.category-card:hover {
		transform: none;
	}
}

.category-name {
	margin: 0;
	font-family: var(--vp-font-family-mono);
	font-size: 14px;
	font-weight: 600;
	line-height: 1.4;
	color: var(--vp-c-brand-1);
}

.category-count {
	margin: 2px 0 0;
	font-size: 12px;
	font-weight: 600;
	line-height: 1.5;
	color: var(--vp-c-text-3);
}

.category-desc {
	margin: 8px 0 0;
	font-size: 13px;
	line-height: 1.6;
	color: var(--vp-c-text-2);
}

.category-summary {
	margin: 0;
	font-size: 13px;
	font-weight: 600;
	color: var(--vp-c-text-3);
}
</style>
