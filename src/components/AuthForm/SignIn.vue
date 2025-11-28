<template>
	<n-form ref="formRef" :model="model" :rules="rules">
		<n-form-item path="username" label="Username">
			<n-input
				v-model:value="model.username"
				@keydown.enter="signIn"
				placeholder="Example@email.com"
				size="large"
				autocomplete="on"
			/>
		</n-form-item>
		<n-form-item path="password" label="Password">
			<n-input
				v-model:value="model.password"
				type="password"
				show-password-on="click"
				placeholder="At least 8 characters"
				@keydown.enter="signIn"
				autocomplete="on"
				size="large"
			/>
		</n-form-item>
		<div class="flex flex-col items-end gap-6">
			<div class="flex justify-between w-full">
				<n-checkbox size="large" :on-update:checked="rememberMe" :checked="isRememberMe">
					Remember me
				</n-checkbox>
			</div>
			<div class="w-full">
				<n-button type="primary" @click="signIn" class="!w-full" size="large">Sign in</n-button>
			</div>
		</div>
	</n-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"

import {
	type FormInst,
	type FormValidationError,
	useMessage,
	type FormRules,
	NForm,
	NFormItem,
	NInput,
	NButton,
	NCheckbox
} from "naive-ui"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"

interface ModelType {
	username: string | null
	password: string | null
}

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const model = reactive<ModelType>({
	username: "chaiwat",
	password: "ratanapan"
})

const emit = defineEmits<{
	(e: "forgot-password"): void
}>()

const rules: FormRules = {
	username: [
		{
			required: true,
			trigger: ["blur"],
			message: "Username is required"
		}
	],
	password: [
		{
			required: true,
			trigger: ["blur"],
			message: "Password is required"
		}
	]
}
onMounted(() => {
	const username = sessionStorage.getItem("username")
	const password = sessionStorage.getItem("password")
	if (username && password) {
		model.username = username
		model.password = password
	}
})
const authStore = useAuthStore()

const isRememberMe = ref(false)
async function signIn(e: Event) {
	e.preventDefault()
	await formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
		if (!errors) {
			if (isRememberMe.value) {
				sessionStorage.setItem("username", model?.username || ("" as string))
				sessionStorage.setItem("password", model?.password || ("" as string))
			}
			await authStore.login(model)
			router.push({ path: "/profile", replace: true })
		} else {
			message.error("Invalid credentials")
		}
	})
}
function rememberMe(value: boolean) {
	isRememberMe.value = value
}
</script>
