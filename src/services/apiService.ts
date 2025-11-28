import axios from "@/plugins/axios"

const Auth = {
	Login: (data: any) => axios.post("/api/v1/auth/login", data),
	Profile: () => axios.get("/api/v1/auth/profile"),
	Logout: (data: any) => axios.get("/api/v1/auth/logout", data)
}
const UserManagement = {
	updateUserCapability: (data: any) => axios.patch("/api/v1/user-management/update-user-capability", data),
	getUser: (params: any) => axios.get("/api/v1/user-management/users", { params }),
	updateUser: (data: any) => axios.patch("/api/v1/user-management/update-user", data),
	createUser: (data: any) => axios.post("/api/v1/user-management/create-user", data),
	getUserById: (id: number) => axios.get(`/api/v1/user-management/user/${id}`),
	deleteUser: (id: number) => axios.delete(`/api/v1/user-management/user/${id}`),
	getRoles: (params: any) => axios.get("/api/v1/user-management/roles", { params }),
	getRoleByid: (id: number) => axios.get(`/api/v1/user-management/role/${id}`),
	deleteRoleByid: (id: number) => axios.delete(`/api/v1/user-management/role/${id}`),
	createRole: (data: any) => axios.post("/api/v1/user-management/create-role", data),
	updateRole: (data: any) => axios.patch("/api/v1/user-management/update-role", data)
}
const TeamManagement = {
	getTeam: (params: any) => axios.get("/api/v1/user-management/teams", { params }),
	createTeam: (data: any) => axios.post("/api/v1/user-management/create-team", data),
	updateTeam: (data: any) => axios.patch("/api/v1/user-management/update-team", data),
	getTeamById: (id: number) => axios.get(`/api/v1/user-management/team/${id}`),
	deleteTeam: (id: number) => axios.delete(`/api/v1/user-management/delete-team/${id}`),
	getTeamAllEditBA: (params?: any) => axios.get("/api/v1/user-management/teams-all-edit-ba", { params }),
	createTeamAssignBrand: (data: any) => axios.post("/api/v1user-management/update-team-assign-handle", data),
	deleteTeamAssignBrand: (data: any) => axios.post("/api/v1/user-management/update-team-unassign-handle", data),
	postTeamAssign: (data: any) => axios.post("/api/v1/user-management/update-team-assign-handle", data),
	postTeamUnAssign: (data: any) => axios.post("/api/v1/user-management/update-team-unassign-handle", data)
}

const Master = {
	getCapability: () => axios.get("/api/v1/master/capability"),
	getRole: () => axios.get("/api/v1/master/role"),
	getBrands: () => axios.get("/api/v1/master/brand"),
	getSocial: () => axios.get("/api/v1/master/social"),
	getTopic: () => axios.get("/api/v1/incident-management/topic")
}

const SystemMasterData = {
	getAllSystemMasterData: () => axios.get("/api/v1/master/system_master_data/category"),
	getSystemMasterData: (params: any) => axios.get("/api/v1/master/system_master_data", { params }),
	createSystemMasterData: (data: any) => axios.post("/api/v1/master/system_master_data", data),
	updateSystemMasterData: (data: any) => axios.patch("/api/v1/master/system_master_data", data),
	getTopicMasterData: (params: any) => axios.get("/api/v1/master/topic_master", { params }),
	postTopicMasterData: (data: any) => axios.post("/api/v1/master/topic_master", data),
	updateTopicMasterData: (data: any) => axios.patch("/api/v1/master/topic_master", data),
	deleteTopicMasterData: (id: number) => axios.delete(`/api/v1/master/topic_master/${id}`)
}

const Candidate = {
	getCandidates: (params: any) => axios.get("/api/v1/candidate", { params }),
	getCandidateById: (id: number) => axios.get(`/api/v1/candidate/${id}`),
	updateCandidate: (data: any) => axios.patch("/api/v1/candidate", data),
	updateFormula: (data: any) => axios.patch("/api/v1/candidate/update-formula", data),
	createCandidateToReview: (data: any) => axios.post("/api/v1/candidate/claims", data),
	getCandidateToReview: (data: any) => axios.post("/api/v1/candidate/init-review", data),
	getCandidateToReviewMany: (data: any) => axios.post("/api/v1/candidate/init-review-many", data),
	getCandidateToReviewById: (params: any) => axios.get("/api/v1/candidate/review", { params }),
	updateCandidateReview: (data: any) => axios.post("/api/v1/candidate/review", data),
	getCandidateReviewList: () => axios.get("api/v1/candidate/assignee-list"),
	getCandidateCount: () => axios.get("api/v1/candidate/countAvailable"),
	getBaManageMent: (params: any) => axios.get("api/v1/candidate/point", { params }),
	updateBaManageMent: (data: any) => axios.patch("api/v1/candidate/point", data),
}

const Incident = {
	createIncident: (data: any) => axios.post("/api/v1/incident-management", data),
	updateIncident: (data: any) => axios.patch("/api/v1/incident-management", data),
	getIncidents: (params: any) => axios.get("/api/v1/incident-management", { params }),
	getIncidentById: (id: number) => axios.get(`/api/v1/incident-management/${id}`),
	getTeamAndBa: () => axios.get("/api/v1/incident-management/team-ba"),
	getRandomBa: (params: any) => axios.get("/api/v1/incident-management/team-ba-random", { params }),
	getExportIncident: (params: any) => axios.get("/api/v1/incident-management/export/", { params }),
	getTeamUsers: (params: any) => axios.get("/api/v1/incident-management/team-user", { params }),
	deleteIncident: (id: number) => axios.delete(`/api/v1/incident-management/${id}`),
}

export const ApiService = {
	v1: {
		Auth,
		UserManagement,
		TeamManagement,
		Master,
		Candidate,
		Incident,
		SystemMasterData
	}
}
