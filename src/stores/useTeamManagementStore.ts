import { defineStore } from "pinia"
import { ApiService } from "@/services/apiService"

import type { Team } from "@/types/teamMangamentApi"
import type { respondApi } from "@/types/respondApi"
export interface dataApiGetTeams extends respondApi {
	data: Team[]
}
export const useTeamManagementStore = defineStore("teamManagementStore", {
	state: (): {
		team: Team
		teams: dataApiGetTeams
		teamAllBA: any
	} => ({
		team: {
			id: 7,
			name: "Team Third",
			is_active: 1,
			is_delete: 0,
			team_member: [
				{
					id: 3,
					username: "danaya",
					email: "danaya,chanpradab@comtech.dev"
				}
			]
		},
		teams: {
			message: "",
			statusCode: 0,
			data: [],
			total: 0,
			page: "1",
			limit: "10"
		},
		teamAllBA: {
			message: "",
			statusCode: 0,
			data: [],
			total: 0,
			page: "1",
			limit: "10"
		}
	}),
	actions: {
		async getTeams(params: any) {
			try {
				const resp = await ApiService.v1.TeamManagement.getTeam(params)
				this.teams = resp?.data
				return resp.data
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async createTeam(data: any, params: any) {
			try {
				await ApiService.v1.TeamManagement.createTeam(data)
				await this.getTeams(params)
			} catch (error: any) {
				console.error(error)
			}
		},
		async updateTeam(data: any, params: any) {
			try {
				await ApiService.v1.TeamManagement.updateTeam(data)
				await this.getTeams(params)
			} catch (error: any) {
				console.error(error)
			}
		},
		async getTeamById(id: number) {
			try {
				const resp = await ApiService.v1.TeamManagement.getTeamById(id)
				this.team = resp?.data
				return resp.data
			} catch (error: any) {
				console.error(error)
			}
		},
		async deleteTeam(id: number, params: any) {
			try {
				await ApiService.v1.TeamManagement.deleteTeam(id)
				await this.getTeams(params)
			} catch (error: any) {
				console.error(error)
			}
		},
		async getTeamAllEditBA(params?: any) {
			try {
				const resp = await ApiService.v1.TeamManagement.getTeamAllEditBA(params)
				this.teamAllBA = resp.data
				return resp.data
			} catch (error: any) {
				console.error(error)
			}
		},
		async createTeamAssignBrand(data: any) {
			try {
				await ApiService.v1.TeamManagement.createTeamAssignBrand(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async deleteTeamAssignBrand(data: any) {
			try {
				await ApiService.v1.TeamManagement.deleteTeamAssignBrand(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async postTeamAssign(data: any) {
			try {
				await ApiService.v1.TeamManagement.postTeamAssign(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async postTeamUnAssign(data: any) {
			try {
				await ApiService.v1.TeamManagement.postTeamUnAssign(data)
			} catch (error: any) {
				console.error(error)
			}
		}
	}
})
