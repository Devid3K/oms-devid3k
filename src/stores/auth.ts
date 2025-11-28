import { defineStore, acceptHMRUpdate } from "pinia";
import type { Role, Roles } from "@/types/auth.d";
import { ApiService } from "@/services/apiService";
import type { AuthProfile } from "@/types/authApi.d";
import _castArray from "lodash/castArray";
// HERE YOU CAN IMPLEMENT YOUR LOGIN

export const useAuthStore = defineStore("auth", {
  state: () => ({
    logged: false,
    role: "admin" as Role | null,
    user: {},
  }),
  actions: {
    setLogged(payload?: any) {
      this.logged = true;
      this.role = "admin";
      this.user = payload;
    },
    setLogout() {
      this.logged = false;
      this.role = null;
      this.user = {};
    },
    async login(userData: any) {
      try {
        // const resp = await ApiService.v1.Auth.Login(userData);
        // const { profile }: { profile: AuthProfile } = resp.data;
        const profile = {
          user: {
            id: 1,
            name: "Chaiwat Ratanapan",
            email: "chaiwat@example.com",
          },
          token: "mocked-jwt-token",
        };
        this.setLogged(profile.user);
        localStorage.setItem("user", JSON.stringify(profile.user));
        localStorage.setItem("token", JSON.stringify(profile.token));
        // localStorage.setItem("role", JSON.stringify(profile.role));
        // localStorage.setItem(
        //   "capabilities",
        //   JSON.stringify(profile.capabilities)
        // );
        // localStorage.setItem(
        //   "capabilities_lists",
        //   JSON.stringify(profile.capabilities_lists)
        // );
      } catch (error: any) {
        this.setLogout();
        console.error(error.message_th);
      }
    },

    async logout(userData: any) {
      try {
        // await ApiService.v1.Auth.Logout(userData);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // localStorage.removeItem("role");
        // localStorage.removeItem("capabilities");
        // localStorage.removeItem("capabilities_lists");
        this.setLogout();
      } catch (error: any) {
        console.error(error.message_th);
      }
    },
  },
  getters: {
    isLogged(state) {
      return state.logged;
    },
    userRole(state) {
      return state.role;
    },
    isRoleGranted(state) {
      return (roles?: Roles) => {
        if (!roles) {
          return true;
        }
        if (!state.role) {
          return false;
        }

        const arrRoles: Role[] = _castArray(roles);

        if (arrRoles.includes("all")) {
          return true;
        }

        return arrRoles.includes(state.role);
      };
    },
  },
  persist: {
    paths: ["logged", "role"],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
