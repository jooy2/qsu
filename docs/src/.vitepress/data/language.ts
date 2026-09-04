/**
 * The selected programming language, as one value the whole site shares.
 *
 * `localStorage` holds it between visits. While a page is open it lives in two
 * places, and neither is redundant:
 *
 * - `<html data-code-lang>` is what displays a page. Every language's content is
 *   in the DOM and CSS hides the rest, so switching costs one attribute write
 *   and no re-render.
 * - The ref below is for the parts drawn in Vue rather than in Markdown: the
 *   switch itself, the sidebar badges and the "not available" notice.
 *
 * `setCodeLanguage` writes the attribute, the ref and storage together.
 */

import { readonly, ref } from 'vue';
import { CODE_LANGUAGE_IDS, CODE_LANGUAGE_STORAGE_KEY, DEFAULT_CODE_LANGUAGE } from './languages';

const current = ref<string>(DEFAULT_CODE_LANGUAGE);

/**
 * The current choice, read-only so that it cannot drift from the attribute.
 *
 * It stays at the default until `syncCodeLanguage` runs on mount, which is what
 * keeps the hydrated markup identical to the pre-rendered markup.
 */
export const codeLanguage = readonly(current);

function isKnown(value: unknown): value is string {
	return typeof value === 'string' && CODE_LANGUAGE_IDS.includes(value);
}

export function setCodeLanguage(next: string): void {
	if (!isKnown(next) || next === current.value) {
		return;
	}

	current.value = next;
	document.documentElement.dataset.codeLang = next;

	try {
		localStorage.setItem(CODE_LANGUAGE_STORAGE_KEY, next);
	} catch {
		// Private browsing, or storage that is full. The choice still applies to
		// this page, it just will not survive a reload.
	}
}

/**
 * Reads the stored choice into the ref and writes it back onto `<html>`.
 *
 * Called once from the layout's `onMounted`. Storage is what it reads, not the
 * attribute: the dev server applies the site's `head` config after the app has
 * booted, so the inline script has not always run by this point.
 */
export function syncCodeLanguage(): void {
	if (typeof document === 'undefined') {
		return;
	}

	let stored: string | null = null;

	try {
		stored = localStorage.getItem(CODE_LANGUAGE_STORAGE_KEY);
	} catch {
		// Private browsing. The attribute is the next best answer.
	}

	const applied = isKnown(stored)
		? stored
		: isKnown(document.documentElement.dataset.codeLang)
			? document.documentElement.dataset.codeLang
			: DEFAULT_CODE_LANGUAGE;

	current.value = applied;
	document.documentElement.dataset.codeLang = applied;
}
