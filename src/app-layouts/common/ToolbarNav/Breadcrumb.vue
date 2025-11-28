<template>
	<n-breadcrumb class="breadcrumb">
		<TransitionGroup name="anim">
			<n-breadcrumb-item
				v-for="(item, index) of items"
				:key="index"
				:class="`index-${index}`"
			>
			<router-link :to="item.to">{{ item.text }}</router-link>
			</n-breadcrumb-item>
		</TransitionGroup>
	</n-breadcrumb>
</template>

<script lang="ts" setup>
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui"
import _upperCase from "lodash/upperCase"
import _capitalize from "lodash/capitalize"
import _split from "lodash/split"
import { type RouteLocationNormalizedLoaded } from "vue-router"
import { onBeforeMount, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import Icon from "@/components/common/Icon.vue"
import {useBreadcrumbsRouter} from "@/composables/useBreadcrumbsRouter"
const HomeIcon = "fluent:home-24-regular"

interface Page {
	text: string
	to: any
}

defineOptions({
	name: "Breadcrumb"
})

const router = useRouter()
const route = useRoute()

const items = ref<Page[]>([])
const breadcrumbsRouter = useBreadcrumbsRouter()

onBeforeMount(async () => {
	items.value = await breadcrumbsRouter.createBreadcrumbs(route)
	router.beforeResolve(async (route) => {
		items.value = await breadcrumbsRouter.createBreadcrumbs(route)
	})
})
</script>

<style lang="scss" scoped>
.breadcrumb {
	.anim-move,
	.anim-enter-active {
		transition: all 0.5s var(--bezier-ease);

		@for $i from 0 through 10 {
			&.index-#{$i} {
				transition-delay: $i * 0.1s;
			}
		}
	}

	.anim-leave-active {
		display: none;
	}

	.anim-enter-from {
		opacity: 0;
		transform: translateX(-5px);
	}
}
</style>
