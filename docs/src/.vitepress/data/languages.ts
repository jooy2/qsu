/**
 * The programming languages qsu ships for.
 *
 * This is the site's second axis. `en` and `ko` decide which human language a
 * page is written in; the value here decides which package that page describes,
 * so a reader on Dart sees Dart examples, Dart types and Dart parameter rules
 * without leaving the page.
 *
 * The ids are what a `::: lang` block names, what `<Val>` takes as attributes,
 * and what `<html data-code-lang>` carries.
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

/**
 * Which languages a piece of content written for `wanted` is displayed to.
 *
 * Usually that is `wanted` itself. The exception is a page some of the packages
 * do not have: hiding everything from a reader on Dart because qsu has no Dart
 * `getCpu` would leave them an empty page, so the languages the page lacks are
 * handed to the first one it has. Content that has nothing for that page at all
 * is displayed to nobody.
 *
 * `implemented` is `null` for a page every language implements, which is most of
 * them. See `functionLanguages` in `config.mts`.
 */
export function displayLanguages(implemented: string[] | null, wanted: string[]): string[] {
	if (!implemented) {
		return wanted;
	}

	const shown = wanted.filter((id) => implemented.includes(id));

	if (shown.length === 0) {
		return [];
	}

	if (!shown.includes(implemented[0])) {
		return shown;
	}

	return [...shown, ...CODE_LANGUAGE_IDS.filter((id) => !implemented.includes(id))];
}

/** A value the reference writes once, or once per language. */
export type PerLanguage = string | Record<string, string>;

/** What `language` reads, for a value written once or once per language. */
export function valueIn(value: PerLanguage, language: string): string {
	if (typeof value === 'string') {
		return value;
	}

	return value[language] ?? value[DEFAULT_CODE_LANGUAGE] ?? '';
}

/**
 * One entry per distinct text, with the languages each is displayed to.
 *
 * Languages that read the same thing share an entry, so a table cell holds one
 * element rather than three when there is only one answer.
 */
export function variantsOf(
	implemented: string[] | null,
	textOf: (language: string) => string
): { text: string; languages: string[] }[] {
	const variants: { text: string; languages: string[] }[] = [];

	for (const language of implemented ?? CODE_LANGUAGE_IDS) {
		const text = textOf(language);
		const existing = variants.find((variant) => variant.text === text);

		if (existing) {
			existing.languages.push(language);
		} else {
			variants.push({ text, languages: [language] });
		}
	}

	return variants.map((variant) => ({
		text: variant.text,
		languages: displayLanguages(implemented, variant.languages)
	}));
}
