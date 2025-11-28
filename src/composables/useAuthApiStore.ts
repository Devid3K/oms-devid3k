import { ApiService } from '@/services/apiService';
import type { AuthProfile } from '@/types/authApi.d';
export function useAuthApiStore() {
    async function login(userData: any) {
        try {
            // const resp = await ApiService.v1.Auth.Login(userData);
            // const { profile }: { profile: AuthProfile } = resp.data;
            const profile = {
                user:{
                    id: 1,
                    name: "Chaiwat Ratanapan",
                    email: "chaiwat@example.com"
                },
                token: "mocked-jwt-token"
            }
            localStorage.setItem("user", JSON.stringify(profile.user))
            localStorage.setItem("token", JSON.stringify(profile.token))
            // localStorage.setItem("role", JSON.stringify(profile.role))
            // localStorage.setItem("capabilities", JSON.stringify(profile.capabilities))
            // localStorage.setItem("capabilities_lists", JSON.stringify(profile.capabilities_lists))
        } catch (error: any) {
            console.error(error.message_th);
        }
    }

    async function logout(userData: any) {
        try {
            // await ApiService.v1.Auth.Logout(userData);
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            // localStorage.removeItem("role")
            // localStorage.removeItem("capabilities")
            // localStorage.removeItem("capabilities_lists")
        } catch (error: any) {
            console.error(error.message_th);
        }
    }

    return {
        login,
        logout
    };
}