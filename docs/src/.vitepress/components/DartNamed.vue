<script setup lang="ts">
import LangLogo from './LangLogo.vue';
</script>
<template>
	<div class="named">
		<LangLogo name="dart" :width="18" />
		<span>Named</span>
	</div>
</template>
<style scoped>
.named {
	display: inline-flex;
	align-items: center;
	border: 2px solid #06589c;
	margin: 0 8px;
	padding: 2px 5px;
	border-radius: 10px;
	font-size: 0.65rem;
	font-weight: 700;
	color: #06589c;
	vertical-align: middle;
	user-select: none;
}
.named span {
	line-height: 1rem;
	margin-left: 5px;
}
</style>
