// {
//     "message": "success",
//     "statusCode": 200,
//     "team": {
//         "name": "Team Peet Lnw",
//         "is_active": 0,
//         "created_by": "natapol",
//         "created_by_id": 1,
//         "created_at": "2024-10-21T12:39:08.847Z",
//         "id": 8,
//         "userTeam": [
//             {
//                 "team_id": 8,
//                 "user_id": 1,
//                 "is_active": 0,
//                 "created_by": "natapol",
//                 "created_by_id": 1,
//                 "created_at": "2024-10-21T12:39:09.000Z",
//                 "updated_by": null,
//                 "updated_by_id": null,
//                 "id": 5,
//                 "is_delete": null,
//                 "updated_at": null
//             }
//         ]
//     }
// }

// team:  {
//     "id": 7,
//     "name": "Team Third",
//     "is_active": 1,
//     "is_delete": 0,
//     "team_member": [
//         {
//             "id": 3,
//             "username": "danaya",
//             "email": "danaya,chanpradab@comtech.dev"
//         }
//     ]
// },

export interface TeamMember {
	id: number
	username: string
	email: string
}

export interface Team {
	id: number
	name: string
	is_active: number | boolean
	is_delete?: number
	team_member: TeamMember[]
}
