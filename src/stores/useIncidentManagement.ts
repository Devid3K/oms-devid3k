import { defineStore } from "pinia"
import { ApiService } from "@/services/apiService"
import type { Incident, Incidents } from "@/types/incidentManagementApi"

export const useIncidentManagementStore = defineStore("incidentManagementStore", {
	state: (): {
		incident: Incident
		incidents: Incidents
		teamAndBa: any[]
		ba: any[]
		teamAndUser: any
	} => ({
		incident: {
			id: 9,
			sentiment_type: "Post",
			brand_id: 1,
			formula_id: 1,
			social_id: 1,
			status_incident: 1,
			page_name: "",
			link_incident: "http://google.com",
			type_incident_before: 1,
			type_incident_after: 1,
			description_before: "",
			description_after: "",
			topic: "",
			ba_type: "",
			owner_link: "",
			incidentBrandAdvocacys: [],
			close: 0,
			is_active: 1,
			is_delete: 0,
			created_by: "natapol",
			created_by_id: 10,
			created_at: "2024-11-29T04:15:50.000Z",
			updated_by: "natapol",
			updated_by_id: 10,
			updated_at: "2024-11-29T05:02:32.000Z",
			incidentTeams: [],
			formula: null,
			date_post: null,
		},
		incidents: {
			data: [],
			page: "",
			total: 0,
			limit: ""
		},
		teamAndBa: [],
		ba: [],
		teamAndUser:[]
	}),
	actions: {
		async getIncidents(params: any) {
			try {
				const resp = await ApiService.v1.Incident.getIncidents(params)
				this.incidents = resp?.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getIncidentById(id: number) {
			try {
				const resp = await ApiService.v1.Incident.getIncidentById(id)
				this.incident = resp?.data?.incident
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async createIncident(data: any) {
			try {
				const resp = await ApiService.v1.Incident.createIncident(data)
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async updateIncident(data: any) {
			try {
				const resp = await ApiService.v1.Incident.updateIncident(data)
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getTeamAndBa() {
			try {
				const resp = await ApiService.v1.Incident.getTeamAndBa()
				this.teamAndBa = resp?.data?.incident
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getRandomBa(params: any) {
			try {
				const resp = await ApiService.v1.Incident.getRandomBa(params)
				this.ba = resp?.data?.result
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getExportIncident(params?: any) {
			try {
				const resp = await ApiService.v1.Incident.getExportIncident(params)
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getTeamUsers(params: any) {
			try {
				const resp = await ApiService.v1.Incident.getTeamUsers(params)
				this.teamAndUser = resp?.data?.result
				return resp?.data?.result
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async deleteIncident(id: number) {
			try {
				await ApiService.v1.Incident.deleteIncident(id)
			} catch (error: any) {
				console.error(error.message_th)
			}
		}
	}
})
