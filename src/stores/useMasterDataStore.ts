import { defineStore } from "pinia"
import type { Capability, Role, Formula, Social } from "@/types/masterDataApi"
import { ApiService } from "@/services/apiService"

export const useMasterDataStore = defineStore("masterDataStore", {
	state: (): {
		capability: Capability[]
		roles: Role[]
		brands: Formula[]
		social: Social[]
		topics: any
	} => ({
		capability: [],
		roles: [],
		brands: [],
		social: [],
		topics: []
	}),
	actions: {
		async getCapability() {
			try {
				const resp = await ApiService.v1.Master.getCapability()
				this.capability = resp?.data?.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getRole() {
			try {
				const resp = await ApiService.v1.Master.getRole()
				this.roles = resp?.data?.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getBrands() {
			try {
				const resp = await ApiService.v1.Master.getBrands()
				this.brands = resp?.data?.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getSocial() {
			try {
				const resp = await ApiService.v1.Master.getSocial()
				this.social = resp?.data?.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getTopic() {
			try {
				const resp = await ApiService.v1.Master.getTopic()
				this.topics = resp?.data?.result
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		}
	}
})
