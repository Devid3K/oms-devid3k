<template>
	<div class="page">Hi, this is a blank page.</div>
</template>
<script>
import { defineComponent, onMounted } from "vue"
import { useAuthApiStore } from "@/composables/useAuthApiStore"

export default defineComponent({
	name: "BlankPage",
	setup() {
		const authApiStore = useAuthApiStore()
		const autoLogin = {
			username: "chaiwat",
			password: "ratanapan"
		}

		// onMounted(async () => {
		// 	await authApiStore.login(autoLogin)
		// })
		return {}
	}
})
</script>
