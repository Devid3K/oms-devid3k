// {
//     "message": "success",
//     "statusCode": 200,
//     "data": [
//         {
//             "id": 1,
//             "email": "natapol.chanpradab@comtech.dev",
//             "username": "natapol",
//             "firstname": "natapol",
//             "lastname": "chanapradab",
//             "role_name": "Administrator",
//             "teams": "Team Third"
//         },
//         {
//             "id": 3,
//             "email": "danaya,chanpradab@comtech.dev",
//             "username": "danaya",
//             "firstname": "danaya",
//             "lastname": "chanpradab",
//             "role_name": "Administrator",
//             "teams": "-"
//         },
//         {
//             "id": 5,
//             "email": "kattiya.chanpradab@comtech.dev",
//             "username": "kattiya",
//             "firstname": "kattiya",
//             "lastname": "chanpradab",
//             "role_name": "Administrator",
//             "teams": "-"
//         }
//     ],
//     "total": 3,
//     "page": "1",
//     "limit": "10"
// }
export interface Item {
    id: number;
    capability_module: string;
    capability_name: string;
    capability_code: string;
    capability_description: string;
    is_active: number;
}

export interface User {
    id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role_id: number;
    role_name: string;
    teams: string;
    password?: string;
    user_capabilitys: Item[];
}

// "id": 1,
// "role_name": "Administrator",
// "role_description": "Administrator of system"
export interface Role {
    id: number;
    role_name: string;
    role_description: string;
    role_capabilitys: Item[];
}
