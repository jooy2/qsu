<script setup>
import { computed, useAttrs } from 'vue';
import { CODE_LANGUAGES, displayLanguages } from '../data/languages';
import { usePageLanguages } from '../data/pageLanguages';

// A value that differs between packages, in the middle of a sentence that does
// not: `<Val js="undefined" dart="null" python="None" />`.
//
// A `::: lang` block cannot do this. It is a block, and splitting a sentence or
// a list item in two to swap one word inside it leaves two paragraphs where
// there was one. Anything longer than a value belongs in a block.
//
// Most values need nothing here at all — `null`, `true` and `false` are written
// per language wherever they appear, by the Markdown renderer. This is for the
// rest, such as a JavaScript `undefined` that the other two spell as `null`.
//
// Each package's text arrives as an attribute named after its id, read off
// `$attrs` rather than declared, so adding a language stays one entry in
// `data/languages.ts`. One with nothing given for it renders nothing.
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const implemented = usePageLanguages();

const variants = computed(() =>
	CODE_LANGUAGES.filter((item) => attrs[item.id]).map((item) => ({
		id: item.id,
		text: String(attrs[item.id]),
		languages: displayLanguages(implemented.value, [item.id]).join(' ')
	}))
);
</script>

<template>
	<code
		v-for="variant in variants"
		:key="variant.id"
		class="lang-only"
		:data-code-lang="variant.languages"
		>{{ variant.text }}</code
	>
</template>
