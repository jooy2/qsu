<script setup>
defineProps({
	ko: Boolean,
	en: Boolean
});
</script>
<template>
	<span v-if="en" class="node-required">Requires a Node.js runtime ('qsu/node')</span>
	<span v-if="ko" class="node-required">Node.js 런타임 필요 ('qsu/node')</span>
</template>
<style scoped>
.node-required {
	font-size: 0.75em !important;
	font-weight: bold;
	border-radius: 9px;
	padding: 4px 10px;
	background: #347e28;
	color: #bcf6b0;
}
</style>
