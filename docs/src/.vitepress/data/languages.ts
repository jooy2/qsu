/**
 * The programming languages qsu ships for.
 *
 * This is the site's second axis. `en` and `ko` decide which human language a
 * page is written in; the value here decides which package that page describes,
 * so a reader on Dart sees Dart examples, Dart types and Dart parameter rules
 * without leaving the page.
 *
 * The ids match the props `<Lang />` already takes in page titles, so a title
 * badge and a `::: lang` block name a language the same way.
 */
export interface CodeLanguage {
	id: string;
	/** Full name, used where there is room for it. */
	label: string;
	/** Short name for the sidebar switch. */
	short: string;
	/** The logo file in `public/images`, without its extension. */
	logo: string;
}

export const CODE_LANGUAGES: CodeLanguage[] = [
	{ id: 'js', label: 'JavaScript', short: 'JS', logo: 'javascript' },
	{ id: 'dart', label: 'Dart', short: 'Dart', logo: 'dart' },
	{ id: 'python', label: 'Python', short: 'Python', logo: 'python' }
];

export const CODE_LANGUAGE_IDS: string[] = CODE_LANGUAGES.map((language) => language.id);

export const DEFAULT_CODE_LANGUAGE = 'js';

/** Where the choice is kept. It applies to the whole site, so not to the URL. */
export const CODE_LANGUAGE_STORAGE_KEY = 'qsu-code-language';

/**
 * The stored choice, written onto `<html>` before the first paint.
 *
 * Every language's content is in the document and CSS displays one of them, so
 * this attribute is what a page is read through. It has to be set by a blocking
 * script rather than by the app: a reader who chose Python would otherwise watch
 * the JavaScript examples render and disappear.
 */
export const CODE_LANGUAGE_HEAD_SCRIPT = `(function(){var ids=${JSON.stringify(CODE_LANGUAGE_IDS)},stored;try{stored=localStorage.getItem(${JSON.stringify(CODE_LANGUAGE_STORAGE_KEY)})}catch(e){}document.documentElement.dataset.codeLang=ids.indexOf(stored)<0?${JSON.stringify(DEFAULT_CODE_LANGUAGE)}:stored})()`;

/**
 * Which languages implement the page at `path`, or `null` when every one does.
 *
 * `map` is `themeConfig.functionLanguages`, which lists only the pages that are
 * not implemented everywhere. The path is a route, so it carries the locale
 * prefix of every locale but the default one — hence the second lookup.
 */
export function languagesOf(
	map: Record<string, string[]> | undefined,
	path: string
): string[] | null {
	const page = path
		.replace(/[?#].*$/, '')
		.replace(/\.html$/, '')
		.replace(/\/$/, '');

	return map?.[page] ?? map?.[page.replace(/^\/[^/]+/, '')] ?? null;
}
