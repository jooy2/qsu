<script setup>
import LangLogo from './LangLogo.vue';

defineProps({
	js: Boolean,
	dart: Boolean
});
</script>
<template>
	<span v-if="js"><LangLogo name="javascript" :width="28" /></span>
	<span v-if="dart"><LangLogo name="dart" :width="28" /></span>
</template>
<style scoped>
span {
	display: inline-block;
	border-radius: 15px;
	font-size: 0.45em;
	vertical-align: middle;
	user-select: none;
}
</style>
