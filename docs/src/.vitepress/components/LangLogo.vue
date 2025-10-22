<script setup>
defineProps({
	name: {
		type: String,
		required: true
	},
	width: {
		type: Number
	},
	height: {
		type: Number
	}
});
</script>
<template>
	<img
		class="lang-logo"
		:src="`/images/${name}.png`"
		:alt="`language-logo-${name}`"
		:style="{ width: `${width}px`, height: height ? `${height}px` : `${width}px` }"
	/>
</template>
<style scoped>
.lang-logo {
	vertical-align: middle;
}
</style>
