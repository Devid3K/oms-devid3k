<template>
	<div class="logo">
		<img src="@/assets/images/logo.png" />
		<h1 v-if="!$props.mini" class="title">{{ $props.title }}</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Logo',
	props: {
		mini: {
			type: Boolean,
			default: false
		},
		title:{
			type: String,
			default: 'Logo'
		}
	}
})
</script>

<style lang="scss" scoped>
.logo {
	height: 100%;
	display: flex;
	align-items: center;

	img {
		max-height: 32px;
		display: block;
		height: 100%;
	}

	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity var(--sidebar-anim-ease) var(--sidebar-anim-duration);
	}

	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
}
</style>
