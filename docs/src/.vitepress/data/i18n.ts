/**
 * The strings the docs' own components draw.
 *
 * Page content is localized by living in `src/en` or `src/ko`. This file covers
 * only the chrome written in Vue: the language switch, the sidebar badges and
 * the notice shown on a function the selected language does not implement.
 *
 * To support a new documentation language, add its key to every entry here and
 * to `supportedLocale` in `config.mts`. A missing key falls back to English.
 */

export const DEFAULT_LOCALE = 'en';

const STRINGS: Record<string, Record<string, string>> = {
	languageLabel: { en: 'Language', ko: '언어' },
	languageSelect: { en: 'Select a programming language', ko: '프로그래밍 언어 선택' },
	languageHint: {
		en: 'Applies to every page on the site.',
		ko: '사이트의 모든 문서에 적용됩니다.'
	},
	unavailableTitle: { en: 'Not available in {language}', ko: '{language}에서는 제공하지 않습니다' },
	unavailableBody: {
		en: 'This function is not part of the {language} package. The documentation below is for {languages}.',
		ko: '이 함수는 {language} 패키지에 없습니다. 아래 문서는 {languages} 기준입니다.'
	},
	/** On the sidebar entry itself, where there is room for one word. */
	unavailableBadge: { en: 'Unsupported', ko: '미지원' },
	unavailableLink: {
		en: 'Not available in {language}. Implemented in {languages}.',
		ko: '{language}에서는 제공하지 않습니다. {languages}에서 제공합니다.'
	},
	/** Between the last two items of a list of names. */
	listJoin: { en: ' and ', ko: ', ' },
	/* `ParamsTable.vue`. The parameter names themselves are never translated:
	   they are what the reader types. */
	paramName: { en: 'Name', ko: '이름' },
	paramType: { en: 'Type', ko: '타입' },
	paramRequired: { en: 'Required', ko: '필수' },
	paramOptional: { en: 'Optional', ko: '선택' },
	paramDefault: { en: 'Default', ko: '기본값' },
	namedChipDart: { en: 'named', ko: 'named' },
	namedChipPython: { en: 'keyword', ko: 'keyword' },
	namedTitleDart: {
		en: 'Passed as a named parameter in Dart',
		ko: 'Dart에서는 named 파라미터로 전달합니다'
	},
	namedTitlePython: {
		en: 'Passed as a keyword argument in Python',
		ko: 'Python에서는 키워드 인자로 전달합니다'
	},
	namedNoteDart: {
		en: 'These parameters are passed as **named parameters**.',
		ko: '이 파라미터는 **named 파라미터**로 전달합니다.'
	},
	namedNotePython: {
		en: 'These parameters are passed as **keyword arguments**, or as a single `dict` in their place.',
		ko: '이 파라미터는 **키워드 인자**로 전달하거나, 대신 `dict` 하나로 전달합니다.'
	}
};

/**
 * Which locale to draw, taken from the page's own `lang` tag rather than from
 * VitePress's `localeIndex` — that is `root` for whichever locale is currently
 * the default, so it would silently mean a different language after a config
 * change.
 */
export function localeOf(lang: string | undefined): string {
	const locale = lang?.split('-')[0];

	return locale && Object.values(STRINGS).every((entry) => entry[locale]) ? locale : DEFAULT_LOCALE;
}

/** `t('en', 'unavailableTitle', { language: 'Dart' })` → `'Not available in Dart'`. */
export function t(locale: string, key: string, values: Record<string, string> = {}): string {
	const text = STRINGS[key]?.[locale] ?? STRINGS[key]?.[DEFAULT_LOCALE] ?? '';

	return text.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}

/** `list('en', ['JavaScript', 'Python'])` → `'JavaScript and Python'`. */
export function list(locale: string, names: string[]): string {
	if (names.length < 2) {
		return names.join('');
	}

	return names.slice(0, -1).join(', ') + t(locale, 'listJoin') + names[names.length - 1];
}
