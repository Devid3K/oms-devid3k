<template>
	<slot />
</template>

<script setup>
import { useMessage, useNotification } from "naive-ui"
import { useGlobalActions } from "@/composables/useGlobalActions"

const message = useMessage()
window.$message = message
const notification = useNotification()
window.$notification = notification

useGlobalActions().init({ message, notification })
</script>
