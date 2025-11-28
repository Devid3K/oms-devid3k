<template>
	<aside
		id="sidebar"
		class="sidebar flex flex-col"
		:class="{ collapsed: sidebarCollapsed, opened: !sidebarCollapsed }"
	>
		<div class="sidebar-wrap grow flex flex-col" ref="sidebar">
			<SidebarHeader :logo-mini="sidebarClosed" />
			<n-scrollbar>
				<Navbar :collapsed="sidebarClosed"></Navbar>
			</n-scrollbar>
			<div class="p-8 relative" v-if="!sidebarCollapsed">
				<img src="/images/help_cemter.png" alt="sidebar-bg" class="w-full" />
				<div style="top: 50%; left: 50%; transform: translate(-50%, -30%)" class="absolute flex items-center flex-col">
					<span class="text-center flex flex-col gap-4 w-[200px] text-white mb-16">
						<h3>Help Center</h3>
						<span>Having Trouble in Learning. Please contact us for more questions.</span>
					</span>
					<n-button size="large" color="#ffffff" ><span class="text-black">Go To Help Center</span></n-button>
				</div>
			</div>
		</div>
	</aside>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue"
import { NScrollbar, NButton } from "naive-ui"
import { onClickOutside, useElementHover } from "@vueuse/core"
import { isMobile } from "@/utils"

import Navbar from "@/app-layouts/common/Navbar/index.vue"
import SidebarHeader from "./SidebarHeader.vue"
import SidebarFooter from "./SidebarFooter.vue"
import { useThemeStore } from "@/stores/theme"

defineOptions({
	name: "Sidebar"
})

const sidebar = ref(null)

const themeStore = useThemeStore()
const sidebarHovered = useElementHover(sidebar)
const sidebarCollapsed = computed(() => themeStore.sidebar.collapsed)
const sidebarClosed = computed(() => sidebarCollapsed.value)
function clickListener() {
	if (sidebar.value) {
		// onClickOutside(sidebar, e => {
		// 	if (!sidebarCollapsed.value) {
		// 		e.stopPropagation()
		// 		themeStore.closeSidebar()
		// 	}
		// })
	}
}

onMounted(() => {
	clickListener()
})
</script>

<style lang="scss" scoped>
@import "./variables";

.sidebar {
	position: fixed;
	z-index: 4;
	top: 0;
	left: 0;
	//bottom: 0;
	//border-right:var(--border-small-100);
	height: 100vh;
	height: 100svh;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: var(--bg-sidebar);
	transition:
		width var(--sidebar-anim-ease) var(--sidebar-anim-duration),
		box-shadow var(--sidebar-anim-ease) var(--sidebar-anim-duration),
		color 0.3s var(--bezier-ease) 0s,
		background-color 0.3s var(--bezier-ease) 0s;
	width: var(--sidebar-close-width);

	.sidebar-wrap {
		overflow: hidden;
	}

	&.opened {
		width: var(--sidebar-open-width);
	}

	:deep(.n-scrollbar-rail) {
		opacity: 0.15;
	}

	// &.collapsed {
	// 	width: var(--sidebar-close-width);

	// 	&:hover {
	// 		width: var(--sidebar-open-width);
	// 		box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.2);
	// 	}
	// }

	@media (max-width: $sidebar-bp) {
		z-index: -1;
		transition: all 0.3s var(--bezier-ease) 0s;
		transform: translateX(-100%);

		&.opened {
			z-index: 4;
			transform: translateX(0);
			box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.2);
			width: var(--sidebar-open-width);
		}
	}
}
</style>
