<template>
	<div class="header-bar flex items-center gap-3 justify-between" style="z-index: 5;">
		<div class="flex items-center gap-4">
			<Icon :size="24" :name="BURGER_ICON" class="cursor-pointer mr-2" @click="themeStore.toggleSidebar()"></Icon>
		</div>
		<div class="flex items-center gap-4">
			<Avatar/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { NScrollbar,NIcon } from "naive-ui"
import Navbar from "@/app-layouts/common/Navbar/index.vue"
import Logo from "@/app-layouts/common/Logo.vue"
import { useThemeStore } from "@/stores/theme"
import Icon from "@/components/common/Icon.vue"
import Avatar from "@/app-layouts/common/Toolbar/Avatar.vue"
defineOptions({
	name: "HeaderBar"
})

const themeStore = useThemeStore()
const BURGER_ICON = "iconamoon:menu-burger-horizontal-bold"
const HomeIcon = "fluent:home-24-regular"
const isDark = computed<boolean>(() => themeStore.isThemeDark)
</script>

<style lang="scss" scoped>
@import "./variables";

.header-bar {
	min-height: var(--header-bar-height);
	padding-left: var(--view-padding);
	padding-right: var(--view-padding);
	height: var(--header-bar-height);
	max-height: var(--header-bar-height);
	background-color: var(--bg-navbar);

	:deep(.n-scrollbar-rail) {
		opacity: 0.15;
	}

	.nav {
		padding-top: 10px;
		margin-right: var(--view-padding);
	}

	@media (max-width: $sidebar-bp) {
		display: none;
	}
}
</style>
