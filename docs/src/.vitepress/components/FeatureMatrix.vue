<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { CODE_LANGUAGES } from '../data/languages';
import { COMPARED_LIBRARIES, FEATURES, VERDICTS } from '../data/features';
import { localeOf, t } from '../data/i18n';

// The feature sheet on the comparison page: one question per row, one column
// per library, a mark in every cell.
//
// The page writes `<FeatureMatrix />` and nothing else. Every language's sheet
// is rendered and CSS shows one of them, the same way a `::: lang` block works,
// so the switch costs no re-render here either. The rows themselves live in
// `data/features.ts`, since they are the same question in all three languages
// and only the answers change.
const { lang } = useData();
const locale = computed(() => localeOf(lang.value));

const wordOf = (verdict) => t(locale.value, VERDICTS[verdict].key);
const textIn = (value) => value?.[locale.value] ?? value?.en ?? '';

/** A row is asked of every language unless it names the ones it applies to. */
const asks = (row, language) => !row.languages || row.languages.split(' ').includes(language);

const sheets = computed(() =>
	CODE_LANGUAGES.map((language) => {
		const libraries = COMPARED_LIBRARIES[language.id] ?? [];

		return {
			id: language.id,
			label: language.label,
			libraries,
			rows: FEATURES.filter((row) => row.group || asks(row, language.id)).map((row) => ({
				group: row.group ? textIn(row.group) : null,
				name: row.name ? textIn(row.name) : null,
				verdicts: (row.support?.[language.id] ?? '')
					.split(' ')
					.filter(Boolean)
					.map((verdict, index) => ({
						mark: VERDICTS[verdict].mark,
						word: wordOf(verdict),
						kind: verdict,
						library: libraries[index]?.name ?? ''
					}))
			}))
		};
	})
);

/** How many rows each column answers with a plain yes, counted from the sheet. */
const tally = (sheet) => {
	const total = sheet.rows.filter((row) => row.verdicts.length).length;

	return sheet.libraries.map((library, index) => ({
		name: library.name,
		count: sheet.rows.filter((row) => row.verdicts[index]?.kind === 'y').length,
		total
	}));
};
</script>

<template>
	<div class="feature-matrix">
		<p class="feature-legend">
			<span v-for="verdict in ['y', 'p', 'n']" :key="verdict" class="feature-legend-item">
				<span class="mark" :class="`mark-${verdict}`" aria-hidden="true">{{
					VERDICTS[verdict].mark
				}}</span>
				{{ wordOf(verdict) }}
			</span>
		</p>

		<div v-for="sheet in sheets" :key="sheet.id" class="lang-only" :data-code-lang="sheet.id">
			<div class="feature-scroll">
				<table>
					<thead>
						<tr>
							<th scope="col" class="col-feature">{{ t(locale, 'featureName') }}</th>
							<th
								v-for="library in sheet.libraries"
								:key="library.name"
								scope="col"
								class="col-mark"
							>
								<a v-if="library.link" :href="library.link" target="_blank" rel="noreferrer">{{
									library.name
								}}</a>
								<span v-else>{{ library.name }}</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="(row, index) in sheet.rows" :key="index">
							<tr v-if="row.group" class="feature-group">
								<th scope="colgroup" :colspan="sheet.libraries.length + 1">{{ row.group }}</th>
							</tr>
							<tr v-else>
								<th scope="row" class="col-feature">{{ row.name }}</th>
								<td
									v-for="verdict in row.verdicts"
									:key="verdict.library"
									class="col-mark"
									:title="`${verdict.library}: ${verdict.word}`"
								>
									<span class="mark" :class="`mark-${verdict.kind}`" aria-hidden="true">{{
										verdict.mark
									}}</span>
									<span class="sr-only">{{ verdict.word }}</span>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>

			<p class="feature-tally">
				{{ t(locale, 'featureTally') }}
				<span v-for="entry in tally(sheet)" :key="entry.name">
					{{ entry.name }} {{ entry.count }}/{{ entry.total }}
				</span>
			</p>
		</div>
	</div>
</template>

<style scoped>
.feature-matrix {
	margin: 16px 0;
}

.feature-legend {
	display: flex;
	flex-wrap: wrap;
	gap: 4px 16px;
	margin: 0 0 12px;
	font-size: 0.8rem;
	color: var(--vp-c-text-2);
}

.feature-legend-item {
	display: inline-flex;
	align-items: center;
	gap: 6px;
}

.feature-scroll {
	overflow-x: auto;
}

.feature-matrix table {
	display: table;
	width: 100%;
	min-width: 420px;
	margin: 0;
	border-collapse: collapse;
}

.feature-matrix thead {
	background-color: var(--vp-c-bg-soft);
}

.feature-matrix th,
.feature-matrix td {
	border: 1px solid var(--vp-c-divider);
	padding: 7px 12px;
	text-align: left;
	vertical-align: middle;
}

.feature-matrix thead th {
	position: sticky;
	top: 0;
	z-index: 1;
	background-color: var(--vp-c-bg-soft);
	font-size: 0.82rem;
	font-weight: 700;
	color: var(--vp-c-text-1);
}

.col-feature {
	font-weight: 400;
	font-size: 0.9em;
}

.col-mark {
	width: 1%;
	white-space: nowrap;
	text-align: center;
}

.feature-group th {
	background-color: var(--vp-c-bg-soft);
	font-size: 0.78rem;
	font-weight: 700;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: var(--vp-c-text-2);
}

.feature-tally {
	margin: 8px 0 0;
	font-size: 0.78rem;
	color: var(--vp-c-text-3);
}

.feature-tally span + span::before {
	content: '·';
	margin: 0 8px;
}

.mark {
	font-size: 0.95rem;
	font-weight: 700;
	line-height: 1;
	user-select: none;
}

.mark-y {
	color: var(--vp-c-brand-1);
}

.mark-p {
	color: var(--vp-c-warning-1);
}

.mark-n {
	color: var(--vp-c-text-3);
}

/* Four columns do not fit a phone, so the table scrolls rather than wrapping
   every feature name onto four lines. Tightening the cells keeps the scroll
   short enough to be worth doing. */
@media (max-width: 640px) {
	.feature-matrix table {
		min-width: 360px;
	}

	.feature-matrix th,
	.feature-matrix td {
		padding: 6px 8px;
	}

	.col-feature {
		font-size: 0.84em;
	}
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style>
