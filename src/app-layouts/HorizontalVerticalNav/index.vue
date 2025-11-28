<template>
	<div class="layout flex flex-col">
		<Sidebar />
		<MainContainer class="grow">
			<slot></slot>
		</MainContainer>
	</div>
</template>

<script lang="ts" setup>
import Sidebar from "./Sidebar.vue"
import MainContainer from "./MainContainer.vue"
defineOptions({
	name: "HorizontalVerticalNav"
})
</script>

<style lang="scss" scoped>
.layout {
	width: 100vw;
	height: 100vh;
	height: 100svh;
	overflow: hidden;
	perspective: 1000px;
}
</style>
