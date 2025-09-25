<script setup>
defineProps({
	dart: Boolean,
	js: Boolean
});
</script>
<template>
	<Badge v-if="dart" type="info" text="Dart" />
	<Badge v-if="js" type="tip" text="JavaScript" />
</template>
