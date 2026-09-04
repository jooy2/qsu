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
		en: 'This function is implemented in {languages}. Switch the language in the sidebar to read its documentation.',
		ko: '이 함수는 {languages}에서 제공합니다. 사이드바에서 언어를 바꾸면 해당 문서를 볼 수 있습니다.'
	},
	unavailableBadge: { en: 'Not in {language}', ko: '{language} 미지원' }
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

/** `t('en', 'unavailableBadge', { language: 'Dart' })` → `'Not in Dart'`. */
export function t(locale: string, key: string, values: Record<string, string> = {}): string {
	const text = STRINGS[key]?.[locale] ?? STRINGS[key]?.[DEFAULT_LOCALE] ?? '';

	return text.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}
