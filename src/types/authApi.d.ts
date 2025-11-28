// "profile": {
//     "user": {
//         "id": 1,
//         "email": "natapol.chanpradab@comtech.dev",
//         "username": "natapol",
//         "firstname": "natapol",
//         "lastname": "chanapradab",
//         "role_id": 1,
//         "created_by": null,
//         "created_by_id": null,
//         "created_at": "2024-09-19T05:49:03.000Z",
//         "updated_by": "natapol",
//         "updated_by_id": 1,
//         "updated_at": "2024-09-20T08:21:56.000Z"
//     },
//     "token": "8202fe5fa741f87608ad50a14aa781c7ab63eaee9ee4552854aa9ef0aca5f99c",
//     "role": {
//         "id": 1,
//         "role_name": "Administrator",
//         "role_code": "administrator",
//         "role_level": "99"
//     },
//     "capabilities": [
//         {
//             "id": 3,
//             "role_id": 1,
//             "capability_id": 3,
//             "is_active": 1,
//             "is_delete": 0,
//             "created_by": null,
//             "created_by_id": null,
//             "created_at": "2024-09-19T22:02:02.000Z",
//             "updated_by": null,
//             "updated_by_id": null,
//             "updated_at": "2024-09-20T01:20:39.000Z",
//             "capability": {
//                 "id": 3,
//                 "capability_name": "User Management Create User",
//                 "capability_code": "um-operation-create",
//                 "capability_description": "Can create user in user management",
//                 "is_active": 1
//             }
//         },
//         {
//             "id": 2,
//             "role_id": 1,
//             "capability_id": 2,
//             "is_active": 1,
//             "is_delete": 0,
//             "created_by": null,
//             "created_by_id": null,
//             "created_at": "2024-09-19T22:02:02.000Z",
//             "updated_by": null,
//             "updated_by_id": null,
//             "updated_at": "2024-09-20T01:20:39.000Z",
//             "capability": {
//                 "id": 2,
//                 "capability_name": "User Management Full Access",
//                 "capability_code": "um-operation-all",
//                 "capability_description": "Can do anything in  user management",
//                 "is_active": 1
//             }
//         },
//         {
//             "id": 1,
//             "role_id": 1,
//             "capability_id": 1,
//             "is_active": 1,
//             "is_delete": 0,
//             "created_by": null,
//             "created_by_id": null,
//             "created_at": "2024-09-19T21:02:51.000Z",
//             "updated_by": null,
//             "updated_by_id": null,
//             "updated_at": "2024-09-19T21:02:51.000Z",
//             "capability": {
//                 "id": 1,
//                 "capability_name": "Brand Advocacy access every list",
//                 "capability_code": "ba-view-all",
//                 "capability_description": "Can see every list in BA module",
//                 "is_active": 1
//             }
//         }
//     ],
//     "capabilities_lists": [
//         "um-operation-create",
//         "um-operation-all",
//         "ba-view-all"
//     ]
// }
export interface User {
    id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role_id: number;
    created_by: string | null;
    created_by_id: number | null;
    created_at: string;
    updated_by: string;
    updated_by_id: number;
    updated_at: string;
}
export type Role = "all" | "admin" | "moderator"
export interface Capability {
    id: number;
    role_id: number;
    capability_id: number;
    is_active: number;
    is_delete: number;
    created_by: string | null;
    created_by_id: number | null;
    created_at: string;
    updated_by: string | null;
    updated_by_id: number | null;
    updated_at: string;
    capability: {
        id: number;
        capability_name: string;
        capability_code: string;
        capability_description: string;
        is_active: number;
    }
}
export interface AuthProfile {
    user: User;
    token: string;
    role: Role;
    capabilities: Capability[];
    capabilities_lists: string[];
}