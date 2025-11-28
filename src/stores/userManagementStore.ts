import { defineStore } from "pinia"
import type { User, Role } from "@/types/userManagementApi"
import type { respondApi } from "@/types/respondApi"
import { ApiService } from "@/services/apiService"

export interface dataApiGetUsers extends respondApi {
	data: User[]
}
export interface dataApiGetRoles extends respondApi {
	data: Role[]
}
export const useUserManagementStore = defineStore("userManagementStore", {
	state: (): {
		user: User
		users: dataApiGetUsers
		role: Role
		roles: dataApiGetRoles
	} => ({
		user: {
			id: 1,
			email: "natapol.chanpradab@comtech.dev",
			username: "natapol",
			firstname: "natapol",
			lastname: "chanapradab",
			role_id: 1,
			role_name: "Administrator",
			teams: "Team Third",
			user_capabilitys: []
		},
		users: {
			message: "",
			statusCode: 0,
			data: [],
			total: 0,
			page: "1",
			limit: "10"
		},
		role: {
			id: 0,
			role_name: "",
			role_description: "",
			role_capabilitys: []
		},
		roles: {
			message: "",
			statusCode: 0,
			data: [],
			total: 0,
			page: "1",
			limit: "10"
		}
	}),

	actions: {
		async getUsers(params: any) {
			try {
				const resp = await ApiService.v1.UserManagement.getUser(params)
				this.users = resp?.data
				return resp.data
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async createUser(data: any, params: any) {
			try {
				await ApiService.v1.UserManagement.createUser(data)
				await this.getUsers(params)
			} catch (error: any) {
				console.error(error)
			}
		},
		async updateUser(data: any, params: any) {
			try {
				await ApiService.v1.UserManagement.updateUser(data)
				await this.getUsers(params)
			} catch (error: any) {
				console.error(error)
			}
		},
		async getUserById(id: number) {
			try {
				const resp = await ApiService.v1.UserManagement.getUserById(id)
				this.user = resp?.data?.user
				return resp?.data?.user
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async updateUserCapability(data: any, params:any) {
			try {
				await ApiService.v1.UserManagement.updateUserCapability(data)
				await this.getUsers(params)
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async deleteUserById(id: number, params: any) {
			try {
				await ApiService.v1.UserManagement.deleteUser(id)
				await this.getUsers(params)
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getRoles(params: any) {
			try {
				const resp = await ApiService.v1.UserManagement.getRoles(params)
				this.roles = resp?.data
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getRoleById(id: any) {
			try {
				const resp = await ApiService.v1.UserManagement.getRoleByid(id)
				this.role = resp?.data?.role
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async deleteRoleById(id: any, params: any) {
			try {
				await ApiService.v1.UserManagement.deleteRoleByid(id)
				await this.getRoles(params)
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async createRole(data: any, params: any) {
			try {
				await ApiService.v1.UserManagement.createRole(data)
				await this.getRoles(params)
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async updateRole(data: any, params: any) {
			try {
				await ApiService.v1.UserManagement.updateRole(data)
				await this.getRoles(params)
			} catch (error: any) {
				console.error(error.message_th)
			}
		}
	},
	getters: {
		getRolesData: state => {
			return state.roles as dataApiGetRoles
		},
		getRoleByIdData: state => {
			return state.role as Role
		}
	}
})
