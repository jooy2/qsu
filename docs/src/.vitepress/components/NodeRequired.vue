<script setup>
import LangLogo from './LangLogo.vue';

defineProps({
	ko: Boolean,
	en: Boolean
});
</script>
<template>
	<span v-if="en" class="node-required"
		><LangLogo name="javascript" :width="18" />Requires a Node.js runtime ('qsu/node')</span
	>
	<span v-if="ko" class="node-required"
		><LangLogo name="javascript" :width="18" />Node.js 런타임 필요 ('qsu/node')</span
	>
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
