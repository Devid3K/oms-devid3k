// {
//     "id": 1,
//     "capability_name": "Brand Advocacy access every list",
//     "capability_code": "ba-view-all",
//     "capability_description": "Can see every list in BA module",
//     "is_active": 1
// },
// [
//     {
//         "name": "BrandAdvocacyManagement",
//         "item": [
//             {
//                 "id": 4,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy access all management",
//                 "capability_code": "ba-manage-all",
//                 "capability_description": "This capability allow all management of ba module",
//                 "is_active": 1
//             },
//             {
//                 "id": 5,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy view all candidate",
//                 "capability_code": "ba-candidate-view-all",
//                 "capability_description": "Can view all candidate data",
//                 "is_active": 1
//             },
//             {
//                 "id": 6,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy view handle candidate",
//                 "capability_code": "ba-candidate-view-brand",
//                 "capability_description": "Can view candidate data if product formula is handle by your team",
//                 "is_active": 1
//             },
//             {
//                 "id": 7,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy edit all candidate",
//                 "capability_code": "ba-candidate-edit-all",
//                 "capability_description": "Can edit all candidate data",
//                 "is_active": 1
//             },
//             {
//                 "id": 8,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy edit handle candidate",
//                 "capability_code": "ba-candidate-edit-brand",
//                 "capability_description": "Can edit candidate data if product formula is handle by your team",
//                 "is_active": 1
//             },
//             {
//                 "id": 9,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy delete all candidate",
//                 "capability_code": "ba-candidate-delete-all",
//                 "capability_description": "Can delete all candidate data",
//                 "is_active": 1
//             },
//             {
//                 "id": 10,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy delete handle candidate",
//                 "capability_code": "ba-candidate-delete-brand",
//                 "capability_description": "Can delete candidate data if product formula is handle by your team",
//                 "is_active": 1
//             },
//             {
//                 "id": 11,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy review all candidate",
//                 "capability_code": "ba-candidate-review-all",
//                 "capability_description": "Can review all candidate",
//                 "is_active": 1
//             },
//             {
//                 "id": 12,
//                 "capability_module": "BrandAdvocacyManagement",
//                 "capability_name": "Brand Advocacy review handle candidate",
//                 "capability_code": "ba-candidate-review-brand",
//                 "capability_description": "Can review candidate data if product formula is handle by your team",
//                 "is_active": 1
//             }
//         ]
//     },
// ]

import type exp from "constants";

export interface Item {
    id: number;
    capability_module: string;
    capability_name: string;
    capability_code: string;
    capability_description: string;
    is_active: number;
}
export interface Capability {
    name: string;
    item: Item[];
}
export interface Role {
    id: number;
    role_name: string;
    role_code: string;
    role_level: string;
}

export interface Formula {
    id: number;
    name: string;
    brand_id: number;
    is_active: number;
    is_delete: number;
  }
  
  export interface Brand {
    id: number;
    name: string;
    is_active: number;
    is_delete: number;
    formulas: Formula[];
  }

//   {
//     "id": 1,
//     "name": "Facebook ( Group )",
//     "code": "facebook_group",
//     "is_active": 1,
//     "is_delete": 0,
//     "created_by": null,
//     "created_by_id": null,
//     "created_at": null,
//     "updated_by": null,
//     "updated_by_id": null,
//     "updated_at": null
// },
  export interface Social {
    id: number;
    name: string;
    code: string;
    is_active: number;
    is_delete: number;
    created_by: any;
    created_by_id: any;
    created_at: any;
    updated_by: any;
    updated_by_id: any;
    updated_at: any;
  }