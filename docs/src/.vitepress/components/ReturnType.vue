<script setup>
import { computed } from 'vue';
import { typeVariants } from '../data/types';
import { usePageLanguages } from '../data/pageLanguages';

// What a function gives back, in the type name of the language being read.
//
// `<ReturnType type="Promise<string>" />` is enough for a function whose ports
// agree: Dart reads `Future<String>` and Python `str`. A package that really
// differs says so itself:
//
//   <ReturnType :type="{ js: 'number', dart: 'num', python: 'float' }" />
//
// Every spelling is in the document and CSS displays one, so the block does not
// change shape when the reader switches language. See `data/types.ts`.
const props = defineProps({
	type: {
		type: [String, Object],
		required: true
	}
});

const implemented = usePageLanguages();
const variants = computed(() => typeVariants(props.type, implemented.value));
</script>

<template>
	<blockquote class="return-type">
		<p
			v-for="variant in variants"
			:key="variant.text"
			class="lang-only"
			:data-code-lang="variant.languages.join(' ')"
		>
			{{ variant.text }}
		</p>
	</blockquote>
</template>
