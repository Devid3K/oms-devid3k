// {
import { Team } from "./incidentManagementApi"
//     "id": 9,
//     "topic": "",
//     "sentiment_type": "Post",
//     "brand_id": 1,
//     "formula_id": 1,
//     "social_id": 1,
//     "status_incident": 1,
//     "page_name": "",
//     "link_incident": "http://google.com",
//     "type_incident_before": 1,
//     "type_incident_after": 1,
//     "description_before": "",
//     "description_after": null,
//     "ba_type": null,
//     "owner_link": null,
//     "close": 0,
//     "is_active": 1,
//     "is_delete": 0,
//     "created_by": "natapol",
//     "created_by_id": 10,
//     "created_at": "2024-11-29T04:15:50.000Z",
//     "updated_by": "natapol",
//     "updated_by_id": 10,
//     "updated_at": "2024-11-29T05:02:32.000Z",
//     "incidentBrandAdvocacys": [
//         {
//             "id": 4,
//             "incident_id": 9,
//             "team_id": 7,
//             "brand_advocacy_id": 25,
//             "point": 5,
//             "processed": 0,
//             "is_active": 1,
//             "is_delete": 0,
//             "created_by": "natapol",
//             "created_by_id": 10,
//             "created_at": "2024-11-29T04:15:50.000Z",
//             "updated_by": "natapol",
//             "updated_by_id": 10,
//             "updated_at": "2024-11-29T04:52:06.000Z",
//             "team": {
//                 "id": 7,
//                 "name": "Team Third",
//                 "is_active": 1,
//                 "is_delete": 0,
//                 "is_default": null,
//                 "created_by": "natapol",
//                 "created_by_id": 1,
//                 "created_at": "2024-09-24T00:13:55.000Z",
//                 "updated_by": "natapol",
//                 "updated_by_id": 10,
//                 "updated_at": "2024-11-25T18:20:27.000Z"
//             },
//             "brandAdvocacy": {
//                 "id": 25,
//                 "candidate_id": 7,
//                 "candidate_review_id": 67,
//                 "point": 0,
//                 "buzzebees_ref_id": 0,
//                 "is_active": 1,
//                 "is_delete": 0,
//                 "is_review": 1,
//                 "review_status_id": 3,
//                 "latest_review_date": "2024-11-28T13:45:08.000Z",
//                 "created_by": "natapol",
//                 "created_by_id": 10,
//                 "created_at": "2024-11-28T13:45:08.000Z",
//                 "updated_by": null,
//                 "updated_by_id": null,
//                 "updated_at": null,
//                 "candidate": {
//                     "id": 7,
//                     "nickname": "เม่น",
//                     "firstname": "ณฐพล",
//                     "lastname": "ชั้นประดับ",
//                     "gender": "M",
//                     "email": "natapol.chanpradab@gmail.com",
//                     "facebook": "natapol",
//                     "telephone": "0925102223",
//                     "line": "0925102223",
//                     "birthdate": "1995-04-09T17:00:00.000Z",
//                     "address": null,
//                     "is_contactable_telephone": 0,
//                     "is_contactable_sms": 0,
//                     "occupation": "ลูกจ้าง",
//                     "is_active": 1,
//                     "is_delete": 0,
//                     "is_review": 0,
//                     "latest_review_date": null,
//                     "picked_by": 10,
//                     "picked_at": "2024-11-25T18:09:24.000Z",
//                     "created_by": "EXTERNAL-CANDIDATE",
//                     "created_by_id": 0,
//                     "created_at": "2024-11-09T08:03:46.000Z",
//                     "updated_by": "natapol",
//                     "updated_by_id": 10,
//                     "updated_at": "2024-11-29T17:26:01.000Z"
//                 }
//             }
//         }
//     ]
// },

export interface Incident {
	id: number
	topic: string
	sentiment_type: string
	brand_id: number
	formula_id: number
	social_id: number
	status_incident: number
	page_name: string
	link_incident: string
	type_incident_before: number
	type_incident_after: number
	description_before: string
	description_after: string
	ba_type: string
	owner_link: string
	close: number
	is_active: number
	is_delete: number
	created_by: string
	created_by_id: number
	created_at: string
	updated_by: string
	updated_by_id: number
	updated_at: string
	incidentBrandAdvocacys: IncidentBrandAdvocacy[],
	incidentTeams:any[],
	formula: any,
	date_post: string | null
}

export interface IncidentBrandAdvocacy {
	id: number
	incident_id: number
	team_id: number
	brand_advocacy_id: number
	point: number
	processed: number
	is_active: number
	is_delete: number
	created_by: string
	created_by_id: number
	created_at: string
	updated_by: string
	updated_by_id: number
	updated_at: string
	team: Team
	brandAdvocacy: BrandAdvocacy
}

export interface Team {
	id: number
	name: string
	is_active: number
	is_delete: number
	is_default: number
	created_by: string
	created_by_id: number
	created_at: string
	updated_by: string
	updated_by_id: number
	updated_at: string
}

export interface BrandAdvocacy {
	id: number
	candidate_id: number
	candidate_review_id: number
	point: number
	buzzebees_ref_id: number
	is_active: number
	is_delete: number
	is_review: number
	review_status_id: number
	latest_review_date: string
	created_by: string
	created_by_id: number
	created_at: string
	updated_by: string
	updated_by_id: number
	updated_at: string
	candidate: Candidate
}

export interface TeamAndBa {
	id: number
	name: string
	is_active: number
	is_delete: number
	is_default: number
	created_by: string
	created_by_id: number
	created_at: string
	updated_by: string
	updated_by_id: number
	updated_at: string
	teamBrandAdvocacy: TeamBrandAdvocacy[]
}

export interface Incidents {
		data:Incident[]
		total:number
		page:string
		limit:string

}