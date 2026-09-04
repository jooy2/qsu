<script setup>
import LangLogo from './LangLogo.vue';

defineProps({
	ko: Boolean,
	en: Boolean
});
</script>
<template>
	<!-- The `qsu/node` subpath is a JavaScript concern: the same functions are a
	     plain import in Dart and Python. So the banner is gated the way a
	     `::: lang js` block is. -->
	<span class="node-required lang-only" data-code-lang="js">
		<LangLogo name="javascript" :width="18" />
		<span v-if="en">Requires a Node.js runtime ('qsu/node')</span>
		<span v-else-if="ko">Node.js 런타임 필요 ('qsu/node')</span>
	</span>
</template>
<style scoped>
.node-required {
	display: inline-block;
	font-size: 0.75em !important;
	font-weight: bold;
	margin: 10px 0;
	border-radius: 9px;
	padding: 4px 10px;
	background: #896300;
	color: #ffffff;
}
.node-required img {
	display: inline-block;
	margin-right: 5px;
}
</style>
