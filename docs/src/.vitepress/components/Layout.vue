<script setup>
import DefaultTheme from 'vitepress/theme';
import { onContentUpdated } from 'vitepress';
import { nextTick, onMounted, watch } from 'vue';
import LangSelect from './LangSelect.vue';
import { codeLanguage, syncCodeLanguage } from '../data/language';

// The default layout with the language switch added above the sidebar menu.
//
// The rest of this file keeps "On this page" honest. A heading inside a
// `::: lang` block is hidden with the block, but VitePress builds the outline
// from the Markdown rather than from the DOM, so without this a reader on Dart
// is offered a link that scrolls nowhere. The anchors are the join: an outline
// link's `href` is the id of the heading it points at.
const { Layout } = DefaultTheme;

function syncOutline() {
	const doc = document.querySelector('.vp-doc');

	if (!doc) {
		return;
	}

	for (const link of document.querySelectorAll('.outline-link')) {
		const id = decodeURIComponent(link.getAttribute('href')?.slice(1) ?? '');
		const heading = id ? doc.querySelector(`[id="${CSS.escape(id)}"]`) : null;
		const block = heading?.closest('.lang-only');
		const hidden =
			Boolean(block) && !block.dataset.codeLang.split(' ').includes(codeLanguage.value);

		(link.closest('li') ?? link).classList.toggle('lang-hidden', hidden);
	}
}

// Reading the stored choice here rather than in `enhanceApp` keeps the first
// client render identical to the pre-rendered markup.
onMounted(() => {
	syncCodeLanguage();
	nextTick(syncOutline);
});

// `onContentUpdated` is the hook the outline itself is built on, so it fires on
// the first render and on every navigation.
onContentUpdated(() => nextTick(syncOutline));

// And again when the reader switches language, which changes which half of the
// page exists without changing the page.
watch(codeLanguage, () => nextTick(syncOutline));
</script>

<template>
	<Layout>
		<template #sidebar-nav-before>
			<LangSelect />
		</template>
	</Layout>
</template>
