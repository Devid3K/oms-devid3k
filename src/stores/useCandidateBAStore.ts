import { defineStore } from "pinia"
import { ApiService } from "@/services/apiService"
import  router  from "@/router"
import type { Candidate, CandidatesResponse } from "@/types/candidateBAApi"

export const useCandidateBAStore = defineStore("candidateBAStore", {
	state: (): {
		candidate: Candidate
		candidates: CandidatesResponse
		review: any
		reviewList: any
		candidateCount:any
		point: any
	} => ({
		candidate: {
			id: 0,
			nickname: "",
			firstname: "",
			lastname: "",
			gender: "",
			email: "",
			facebook: "",
			telephone: "",
			line: "",
			birthdate: "",
			address: null,
			is_contactable_telephone: 1,
			is_contactable_sms: 1,
			occupation: "",
			is_active: 1,
			is_delete: 0,
			is_review: 1,
			childrens: [
				{
					id: 2,
					candidate_id: 5,
					nickname: "",
					firstname: "",
					lastname: "",
					gender: "",
					birthdate: "",
					is_active: 1,
					is_delete: 0
				}
			],
			candidateFormulas: [
				{
					id: 4,
					candidate_id: 5,
					formula_id: 2,
					is_active: 1,
					is_delete: 0,
					formula: {
						id: 2,
						name: "",
						brand_id: 2,
						is_active: 1,
						is_delete: 0,
						brand: {
							id: 2,
							name: "",
							is_active: 1,
							is_delete: 0
						}
					}
				},
				{
					id: 5,
					candidate_id: 5,
					formula_id: 3,
					is_active: 1,
					is_delete: 0,
					formula: {
						id: 3,
						name: "",
						brand_id: 1,
						is_active: 1,
						is_delete: 0,
						brand: {
							id: 1,
							name: "",
							is_active: 1,
							is_delete: 0
						}
					}
				}
			],
			candidateReviews: [
				{
					id: 53,
					candidate_id: 0,
					is_telephone_contactable: 0,
					is_sms_contactable: 0,
					facebook_age: "",
					facebook_trust: "",
					facebook_response: "",
					facebook_remark: "",
					line_trust: "0",
					line_response: "0",
					line_remark: "",
					is_send_link: 0,
					is_approve_sms: 0,
					is_approve: 0,
					approve_by: null,
					is_reject: 0,
					reject_reason: null,
					remark: null,
					review_status_id: 1,
					is_draft: 1,
					is_active: 1,
					is_delete: 0,
					created_by_id: 10,
					created_at: "2024-11-26T01:03:20.000Z",
					created_by: "natapol",
					updated_by_id: null,
					updated_by: null,
					updated_at: null
				}
			],
			brandAdvocacys: []
		},
		candidates: {
			message: "",
			statusCode: 0,
			data: [
				// {
				// 	id: 0,
				// 	nickname: "",
				// 	firstname: "",
				// 	lastname: "",
				// 	gender: "",
				// 	email: "",
				// 	facebook: "",
				// 	telephone: "",
				// 	line: "",
				// 	birthdate: "",
				// 	address: "",
				// 	is_contactable_telephone: 0,
				// 	is_contactable_sms: 0,
				// 	occupation: "",
				// 	is_active: 0,
				// 	is_delete: 0,
				// 	is_review: 0,
				// 	childrens: [],
				// 	candidateFormulas: []
				// }
			],
			total: 0,
			page: "1",
			limit: "10"
		},
		review: {
			id: 0,
			candidate_id: 0,
			is_telephone_contactable: 0,
			is_sms_contactable: 0,
			facebook_age: "",
			facebook_trust: "",
			facebook_response: "",
			facebook_remark: "",
			line_trust: "",
			line_response: "",
			line_remark: "",
			is_send_link: 0,
			is_approve_sms: 0,
			is_approve: 0,
			approve_by: null,
			is_reject: 0,
			reject_reason: null,
			remark: null,
			review_status_id: 1,
			is_draft: 1,
			is_active: 1,
			is_delete: 0,
			created_by_id: 10,
			created_at: "2024-11-25T16:51:15.000Z",
			created_by: "natapol",
			updated_by_id: null,
			updated_by: null,
			updated_at: null,
			brandAdvocacys: []
		},
		reviewList: [],
		candidateCount: {
			message: "success",
			statusCode: 200,
			count: {
				total: 0
			}
		},
		point:[]
	}),
	actions: {
		async getCandidates(params: any) {
			try {
				const resp = await ApiService.v1.Candidate.getCandidates(params)
				this.candidates = resp.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getCandidateById(id: number) {
			try {
				const resp = await ApiService.v1.Candidate.getCandidateById(id)
				this.candidate = resp.data.candidate
				return resp
			} catch (error: any) {
				router.push({ name: "NotFound" })
				console.error(error.message_th)
			}
		},
		async updateCandidate(data: any) {
			try {
				await ApiService.v1.Candidate.updateCandidate(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async createCandidateToReview(data: any) {
			try {
				await ApiService.v1.Candidate.createCandidateToReview(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async getCandidateToReview(data: any) {
			try {
				await ApiService.v1.Candidate.getCandidateToReview(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async getCandidateToReviewMany(data: any) {
			try {
				await ApiService.v1.Candidate.getCandidateToReviewMany(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async getCandidateToReviewById(id: any) {
			try {
				const resp = await ApiService.v1.Candidate.getCandidateToReviewById(id)
				this.review = resp.data.review
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async updateCandidateReview(data: any) {
			try {
				await ApiService.v1.Candidate.updateCandidateReview(data)
			} catch (error: any) {
				console.error(error)
			}
		},
		async getCandidateReviewList() {
			try {
				const resp = await ApiService.v1.Candidate.getCandidateReviewList()
				this.reviewList = resp?.data?.users
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getCandidateCount() {
			try {
				const resp = await ApiService.v1.Candidate.getCandidateCount()
				this.candidateCount = resp?.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async getBaManageMent(params: any) {
			try {
				const resp = await ApiService.v1.Candidate.getBaManageMent(params)
				this.point = resp?.data
				return resp
			} catch (error: any) {
				console.error(error.message_th)
			}
		},
		async updateBaManageMent(data: any) {
			try {
				await ApiService.v1.Candidate.updateBaManageMent(data)
			} catch (error: any) {
				console.error(error)
			}
		}
	}
})
