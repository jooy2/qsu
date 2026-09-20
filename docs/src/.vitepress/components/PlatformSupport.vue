<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { formatInline } from '../data/types';
import { valueIn, variantsOf } from '../data/languages';
import { usePageLanguages } from '../data/pageLanguages';
import { localeOf, t } from '../data/i18n';

// What a function can answer on each operating system, and what it cannot.
//
// These are the functions that ask the machine about itself, so what they return
// depends on the system far more than on the language. A page says so per
// platform rather than burying it in a sentence somewhere:
//
//   <PlatformSupport :rows="[
//     { os: 'windows', note: 'Reads `MachineGuid` from the registry.' },
//     { os: 'macos', note: 'Reads `IOPlatformUUID`.' },
//     { os: 'linux', support: 'partial', note: 'Falls back to the hostname.' }
//   ]" />
//
// `support` is `yes` unless the row says otherwise, and both it and `note` may
// be written per language, for the rows where the packages really do differ:
//
//   { os: 'ios', support: { js: 'no', dart: 'yes' }, note: { … } }
const props = defineProps({
	rows: {
		type: Array,
		required: true
	}
});

// Product names, so they are not translated. A platform outside this list is
// written as the page spelled it.
const OS_LABELS = {
	windows: 'Windows',
	macos: 'macOS',
	linux: 'Linux',
	android: 'Android',
	ios: 'iOS',
	freebsd: 'FreeBSD'
};

const SUPPORT_KEYS = {
	yes: 'supportYes',
	partial: 'supportPartial',
	no: 'supportNo'
};

const { lang } = useData();
const locale = computed(() => localeOf(lang.value));
const implemented = usePageLanguages();

const labelOf = (os) => OS_LABELS[os] ?? os;
const supportIn = (row, language) => {
	const value = valueIn(row.support ?? 'yes', language);

	return value in SUPPORT_KEYS ? value : 'yes';
};
// One entry per distinct answer, so a row that says the same thing to every
// language holds one chip rather than three.
const supportsOf = (row) =>
	variantsOf(implemented.value, (language) => supportIn(row, language)).map((variant) => ({
		...variant,
		word: t(locale.value, SUPPORT_KEYS[variant.text])
	}));
// A note is prose, so nothing is translated: a row either says one thing or
// names the languages it says something else to.
const notesOf = (note) =>
	variantsOf(implemented.value, (language) => valueIn(note ?? '', language));
const format = (text) => formatInline(text, implemented.value);
</script>

<template>
	<div class="platform-support">
		<div class="platform-scroll">
			<table>
				<thead>
					<tr>
						<th class="col-os">{{ t(locale, 'platformName') }}</th>
						<th class="col-support">{{ t(locale, 'platformSupport') }}</th>
						<th class="col-note">{{ t(locale, 'platformNote') }}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in rows" :key="row.os">
						<td class="col-os">{{ labelOf(row.os) }}</td>
						<td class="col-support">
							<span
								v-for="variant in supportsOf(row)"
								:key="variant.text"
								class="support lang-only"
								:class="`support-${variant.text}`"
								:data-code-lang="variant.languages.join(' ')"
								>{{ variant.word }}</span
							>
						</td>
						<td class="col-note">
							<span
								v-for="variant in notesOf(row.note)"
								:key="variant.text"
								class="lang-only"
								:data-code-lang="variant.languages.join(' ')"
								v-html="format(variant.text)"
							></span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p
			class="platform-note lang-only"
			data-code-lang="dart"
			v-html="format(t(locale, 'platformWebNote'))"
		></p>
	</div>
</template>

<style scoped>
.platform-support {
	margin: 16px 0;
}

.platform-scroll {
	overflow-x: auto;
}

.platform-support table {
	display: table;
	width: 100%;
	min-width: 480px;
	margin: 0;
	border-collapse: collapse;
}

.platform-support thead {
	background-color: var(--vp-c-bg-soft);
}

.platform-support th,
.platform-support td {
	border: 1px solid var(--vp-c-divider);
	padding: 8px 12px;
	text-align: left;
	vertical-align: top;
}

.platform-support th {
	font-size: 0.82rem;
	font-weight: 700;
	color: var(--vp-c-text-1);
}

.col-os {
	width: 1%;
	white-space: nowrap;
	font-weight: 600;
}

.col-support {
	width: 1%;
	white-space: nowrap;
}

.col-note {
	font-size: 0.9em;
	color: var(--vp-c-text-2);
}

.col-note :deep(code) {
	font-size: 0.95em;
}

.platform-note {
	margin: 8px 0 0;
	font-size: 0.8rem;
	color: var(--vp-c-text-2);
}

.support {
	display: inline-block;
	font-size: 0.72rem;
	font-weight: 700;
	line-height: 1;
	padding: 4px 8px;
	border-radius: 999px;
	white-space: nowrap;
	user-select: none;
}

.support-yes {
	background-color: var(--vp-c-brand-soft);
	color: var(--vp-c-brand-1);
}

.support-partial {
	background-color: var(--vp-c-warning-soft);
	color: var(--vp-c-warning-1);
}

.support-no {
	background-color: var(--vp-c-danger-soft);
	color: var(--vp-c-danger-1);
}
</style>
