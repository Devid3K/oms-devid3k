<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="p-6 bg-white rounded shadow-md">
            <h1 class="text-2xl font-bold mb-4">Logout</h1>
            <p class="mb-4">You have been logged out successfully.</p>
            <button @click="handleLogin" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Login Again
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthApiStore } from "@/composables/useAuthApiStore"
export default defineComponent({
    setup() {
        const router = useRouter();
        const authApiStore = useAuthApiStore()
        onMounted(async () => {
            const username = sessionStorage.getItem('username');
            const password = sessionStorage.getItem('password');
            await authApiStore.logout({username,password});
        });
        const handleLogin = () => {
            router.push('/login');
        };

        return {
            handleLogin,
        };
    },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>