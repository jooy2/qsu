<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import LangLogo from './LangLogo.vue';

const props = defineProps({
	// Rows to render. Each item:
	//   { name, type, required?, named?, default?, desc? }
	// `named` marks the parameter from which arguments become named parameters
	// (Dart) / keyword arguments (Python).
	rows: {
		type: Array,
		required: true
	},
	// Optional type name shown as the table caption (used for expanded object types).
	name: {
		type: String,
		default: ''
	}
});

// UI strings per documentation locale. To localize this table for a new
// language, add a locale key here (keyed by the locale prefix used in
// `.vitepress/config.mts` `supportedLocale`). Anything missing falls back to `en`.
// `note` is the named-parameter footnote, split into fragments around two
// <strong> emphases: [leadIn, strongA, middle, strongB, tailOut].
const LABELS = {
	en: {
		name: 'Name',
		type: 'Type',
		required: 'Required',
		optional: 'Optional',
		default: 'Default',
		namedTitle: 'Named parameter in Dart, keyword argument in Python',
		note: [
			' parameters are passed as ',
			'named parameters',
			' in Dart and ',
			'keyword arguments',
			' in Python.'
		]
	},
	ko: {
		name: '이름',
		type: '타입',
		required: '필수',
		optional: '선택',
		default: '기본값',
		namedTitle: 'Dart에서는 named 파라미터, Python에서는 키워드 인자입니다',
		note: [
			' 표시가 있는 파라미터는 Dart에서는 ',
			'named 파라미터',
			', Python에서는 ',
			'키워드 인자',
			'로 전달됩니다.'
		]
	}
};

const { lang } = useData();
const locale = computed(
	() => Object.keys(LABELS).find((key) => lang.value.startsWith(key)) ?? 'en'
);
const t = (key) => LABELS[locale.value][key] ?? LABELS.en[key];

const hasNamed = computed(() => props.rows.some((row) => row.named));

// Escape HTML, then render inline `code` spans. Content is authored in-repo (trusted).
function formatDesc(text) {
	if (!text) return '';
	const escaped = String(text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
	return escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
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
					<th class="col-name">{{ t('name') }}</th>
					<th class="col-type">{{ t('type') }}</th>
					<th class="col-req">{{ t('required') }}</th>
					<th class="col-default">{{ t('default') }}</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="row in rows" :key="row.name">
					<tr :class="{ 'has-desc': row.desc }">
						<td class="col-name">
							<code class="param-name">{{ row.name }}</code>
							<span
								v-if="row.named"
								class="named-chip"
								:title="t('namedTitle')"
							>
								<LangLogo name="dart" :width="13" />
								<LangLogo name="python" :width="13" />
								<span>named</span>
							</span>
						</td>
						<td class="col-type">
							<code class="param-type">{{ row.type }}</code>
						</td>
						<td class="col-req">
							<span
								v-if="row.required"
								class="req req-yes"
								:title="t('required')"
								>●</span
							>
							<span v-else class="req req-no" :title="t('optional')">–</span>
						</td>
						<td class="col-default">
							<code v-if="row.default !== undefined" class="param-default">{{
								row.default
							}}</code>
							<span v-else class="default-empty">–</span>
						</td>
					</tr>
					<tr v-if="row.desc" class="param-desc-row">
						<td colspan="4">
							<span v-html="formatDesc(row.desc)"></span>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
		</div>

		<p v-if="hasNamed" class="params-note">
			<span class="named-chip named-chip-inline">
				<LangLogo name="dart" :width="13" />
				<LangLogo name="python" :width="13" />
				<span>named</span>
			</span>
			<span>{{ t('note')[0] }}</span
			><strong>{{ t('note')[1] }}</strong
			><span>{{ t('note')[2] }}</span
			><strong>{{ t('note')[3] }}</strong
			><span>{{ t('note')[4] }}</span>
		</p>
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
