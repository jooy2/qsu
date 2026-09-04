<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import LangLogo from './LangLogo.vue';
import { defaultVariants, typeVariants } from '../data/types';
import { displayLanguages } from '../data/languages';
import { usePageLanguages } from '../data/pageLanguages';
import { localeOf, t } from '../data/i18n';

// The parameter table, written in the type names of the language being read.
//
// Every language's spelling of a type is in the document at once and CSS
// displays one, so the table keeps its shape when the reader switches. A row
// names a type once, in the JavaScript package's terms, and `data/types.ts`
// translates it; a row whose packages genuinely differ writes them out:
//
//   { name: 'milliseconds', type: { js: 'number', dart: 'num', python: 'float' } }
//
// `named` marks the parameters that stop being an options object outside
// JavaScript. What that means is different in Dart and in Python, so the chip
// and the footnote are language scoped too, and JavaScript sees neither: there
// the table below already says what the options object holds.
const props = defineProps({
	rows: {
		type: Array,
		required: true
	},
	// Shown as the caption, for a table that expands an object type.
	name: {
		type: String,
		default: ''
	}
});

const { lang } = useData();
const locale = computed(() => localeOf(lang.value));
const implemented = usePageLanguages();

const typesOf = (type) => typeVariants(type, implemented.value);
const defaultsOf = (value) => defaultVariants(value, implemented.value);
const scope = (language) => displayLanguages(implemented.value, [language]).join(' ');

const named = computed(() =>
	[
		{
			id: 'dart',
			chip: t(locale.value, 'namedChipDart'),
			note: t(locale.value, 'namedNoteDart'),
			title: t(locale.value, 'namedTitleDart')
		},
		{
			id: 'python',
			chip: t(locale.value, 'namedChipPython'),
			note: t(locale.value, 'namedNotePython'),
			title: t(locale.value, 'namedTitlePython')
		}
	].map((item) => ({ ...item, languages: scope(item.id) }))
);

const hasNamed = computed(() => props.rows.some((row) => row.named));

// Escape HTML, then render inline `code` and **strong**. Content is authored
// in-repo (trusted).
function format(text) {
	if (!text) {
		return '';
	}

	return String(text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
</script>

<template>
	<div class="params-table">
		<div v-if="name" class="params-caption">
			<code class="params-type-name">{{ name }}</code>
		</div>

		<div class="params-scroll">
			<table>
				<thead>
					<tr>
						<th class="col-name">{{ t(locale, 'paramName') }}</th>
						<th class="col-type">{{ t(locale, 'paramType') }}</th>
						<th class="col-req">{{ t(locale, 'paramRequired') }}</th>
						<th class="col-default">{{ t(locale, 'paramDefault') }}</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="row in rows" :key="row.name">
						<tr :class="{ 'has-desc': row.desc }">
							<td class="col-name">
								<code class="param-name">{{ row.name }}</code>
								<template v-if="row.named">
									<span
										v-for="item in named"
										:key="item.id"
										class="named-chip lang-only"
										:data-code-lang="item.languages"
										:title="item.title"
									>
										<LangLogo :name="item.id" :width="13" />
										<span>{{ item.chip }}</span>
									</span>
								</template>
							</td>
							<td class="col-type">
								<code
									v-for="variant in typesOf(row.type)"
									:key="variant.text"
									class="param-type lang-only"
									:data-code-lang="variant.languages.join(' ')"
									>{{ variant.text }}</code
								>
							</td>
							<td class="col-req">
								<span v-if="row.required" class="req req-yes" :title="t(locale, 'paramRequired')"
									>●</span
								>
								<span v-else class="req req-no" :title="t(locale, 'paramOptional')">–</span>
							</td>
							<td class="col-default">
								<template v-if="row.default !== undefined">
									<code
										v-for="variant in defaultsOf(row.default)"
										:key="variant.text"
										class="param-default lang-only"
										:data-code-lang="variant.languages.join(' ')"
										>{{ variant.text }}</code
									>
								</template>
								<span v-else class="default-empty">–</span>
							</td>
						</tr>
						<tr v-if="row.desc" class="param-desc-row">
							<td colspan="4">
								<span v-html="format(row.desc)"></span>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>

		<template v-if="hasNamed">
			<p
				v-for="item in named"
				:key="item.id"
				class="params-note lang-only"
				:data-code-lang="item.languages"
			>
				<span class="named-chip named-chip-inline">
					<LangLogo :name="item.id" :width="13" />
					<span>{{ item.chip }}</span>
				</span>
				<span v-html="format(item.note)"></span>
			</p>
		</template>
	</div>
</template>

<style scoped>
.params-table {
	margin: 16px 0;
}

.params-caption {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 6px;
}

.params-type-name {
	font-size: 0.85em;
	font-weight: 700;
	background-color: var(--vp-c-brand-soft);
	color: var(--vp-c-brand-1);
	padding: 2px 8px;
	border-radius: 6px;
}

.named-chip {
	display: inline-flex;
	align-items: center;
	gap: 3px;
	margin-left: 6px;
	font-size: 0.62rem;
	font-weight: 700;
	line-height: 1;
	padding: 2px 6px;
	border-radius: 999px;
	border: 1px solid var(--vp-c-divider);
	background-color: var(--vp-c-bg-soft);
	color: var(--vp-c-text-2);
	white-space: nowrap;
	vertical-align: middle;
	user-select: none;
}

.named-chip-inline {
	margin-left: 0;
}

.named-chip :deep(img) {
	vertical-align: middle;
}

.params-scroll {
	overflow-x: auto;
}

.params-table table {
	display: table;
	width: 100%;
	min-width: 480px;
	margin: 0;
	border-collapse: collapse;
}

.params-table thead {
	background-color: var(--vp-c-bg-soft);
}

.params-table th,
.params-table td {
	border: 1px solid var(--vp-c-divider);
	padding: 8px 12px;
	text-align: left;
	vertical-align: top;
}

.params-table th {
	font-size: 0.82rem;
	font-weight: 700;
	color: var(--vp-c-text-1);
}

.col-req {
	width: 1%;
	white-space: nowrap;
	text-align: center;
}

.params-table td.col-req {
	text-align: center;
}

.col-default {
	width: 1%;
	white-space: nowrap;
}

.col-name {
	white-space: nowrap;
}

/* Keep a parameter row visually attached to its description row below it. */
.params-table tr.has-desc > td {
	border-bottom: none;
}

.param-desc-row > td {
	border-top: none;
	padding: 6px 12px;
	vertical-align: middle;
	font-size: 0.9em;
	color: var(--vp-c-text-2);
	background-color: var(--vp-c-bg-soft);
}

.param-desc-row :deep(code) {
	font-size: 0.95em;
}

.default-empty {
	color: var(--vp-c-text-3);
}

.col-type {
	/* Let long union types wrap at their ` | ` separators (short single-word
	   types like `boolean` stay intact since they contain no break points). */
	white-space: normal;
}

.param-name {
	font-weight: 600;
}

.param-type {
	color: var(--vp-c-brand-1);
}

.req {
	font-size: 0.8rem;
}

.req-yes {
	color: var(--vp-c-brand-1);
}

.req-no {
	color: var(--vp-c-text-3);
}

.param-default {
	font-size: 0.9em;
}

.params-note {
	margin: 8px 0 0;
	font-size: 0.8rem;
	color: var(--vp-c-text-2);
}
</style>
