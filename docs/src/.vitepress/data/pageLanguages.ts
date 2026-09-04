/**
 * The languages that implement the page currently being rendered.
 *
 * `null` means every one of them, which is what most reference pages are. The
 * components that draw a page's own content — its types, its parameter rules,
 * its notices — need this to decide who each piece is displayed to. See
 * `displayLanguages` in `languages.ts`.
 */

import { computed, type ComputedRef } from 'vue';
import { useData, useRoute } from 'vitepress';
import { languagesOf } from './languages';

export function usePageLanguages(): ComputedRef<string[] | null> {
	const { theme } = useData();
	const route = useRoute();

	return computed(() => languagesOf(theme.value.functionLanguages, route.path));
}
