<template>
	<n-dropdown :options="options" placement="bottom-end" @select="handleSelect">
		<div class="rounded-full overflow-hidden w-12 h-12 border-2 border-primary">
								<img :src="chaiwatImage" alt="Profile Picture" />
							</div>
	</n-dropdown>
</template>

<script lang="ts" setup>
import { c, NAvatar, NDropdown } from "naive-ui"
import { renderIcon } from "@/utils"
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import chaiwatImage from "@/assets/images/chaiwat.jpg"
const UserIcon = "ion:person-outline"
const LogoutIcon = "ion:log-out-outline"

defineOptions({
	name: "Avatar"
})

const router = useRouter()
const nameAvatar = ref("")
onMounted(() => {
	///get user object from local storage

	const user = JSON.parse(localStorage.getItem("user") || "{}")
	const getFirstName = user?.firstname || ""
	const getLastName = user?.lastname || ""
	const firstWorldFirstName = getFirstName.charAt(0).toUpperCase()
	const firstWorldLastName = getLastName.charAt(0).toUpperCase()
	nameAvatar.value = `${firstWorldFirstName}${firstWorldLastName}`
})
const options = ref([
	{
		label: "Profile",
		key: "route-Profile",
		icon: renderIcon(UserIcon)
	},
	{
		label: "Logout",
		key: "route-Logout",
		icon: renderIcon(LogoutIcon)
	}
])
function handleSelect(key: string) {
	if (key.indexOf("route-") === 0) {
		const path = key.split("route-")[1]
		router.push({ name: path })
	}
}
</script>
