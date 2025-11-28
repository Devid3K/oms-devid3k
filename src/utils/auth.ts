import { useAuthStore } from "@/stores/auth"
import { type RouteMetaAuth } from "@/types/auth.d"
import { type RouteLocationNormalized } from "vue-router"
import router from "@/router"
export function authCheck(route: RouteLocationNormalized) {
	const meta: RouteMetaAuth = route.meta
	const { checkAuth, authRedirect, auth, roles } = meta
	const token = localStorage.getItem("token")
	const authStore = useAuthStore()

	if (route?.redirectedFrom?.name === "Logout") {
		authStore.setLogout()
	}

	if (auth === true) {
		// if (!authStore.isLogged) {
		// 	window.location.href = "/login" + window.location.search
		// 	return false
		// }

		// if (roles && !authStore.isRoleGranted(roles)) {
		// 	window.location.href = "/login" + window.location.search
		// 	return false
		// }
	}

	if (checkAuth === true) {
		if (authStore.isLogged) {
			// if (roles) {
			// 	if (authStore.isRoleGranted(roles)) {
			// 		return authRedirect || "/"
			// 	} else {
			// 		return route.path
			// 	}
			// }
			return authRedirect || "/"
		}
	}
}

export function checkPermission(roles: string[]): boolean {
	const capabilities = localStorage.getItem("capabilities_lists")
	if (!capabilities) {
		return false
	}

	const permissionList = JSON.parse(capabilities)
	let authenticated = false

	for (const role of roles) {
		if (permissionList.indexOf(role) > -1) {
			authenticated = true
			break
		}
	}

	return authenticated
}

function hasTeamBrandPermission(userTeam: any[], brandId: number | string): boolean {
	return userTeam.some(team =>
		team.team.teamBrand.some((brand: any) => brand.brand_id == brandId && brand.is_active === 1)
	)
}

export function checkPermissionCandidateView(roles: string[], brandId: number | string): boolean {
	const capabilities = localStorage.getItem("capabilities_lists")
	const user = localStorage.getItem("user")
	if (!capabilities || !user) {
		return false
	}

	const permissionList = JSON.parse(capabilities)
	const userTeam = JSON.parse(user).userTeam

	for (const role of roles) {
		switch (role) {
			case "ba-manage-all":
				if (permissionList.includes("ba-manage-all")) {
					return true
				}
				break
			case "ba-candidate-review-all":
				if (permissionList.includes("ba-candidate-review-all")) {
					return true
				}
				break
			case "ba-candidate-review-brand":
				if (permissionList.includes("ba-candidate-review-brand")) {
					if (hasTeamBrandPermission(userTeam, brandId)) {
						return true
					}
				}
				break
			case "ba-candidate-edit-all":
				if (permissionList.includes("ba-candidate-edit-all")) {
					return true
				}
				break
			case "ba-candidate-edit-brand":
				if (permissionList.includes("ba-candidate-edit-brand")) {
					if (hasTeamBrandPermission(userTeam, brandId)) {
						return true
					}
				}
				break
			case "ba-candidate-view-all":
				if (permissionList.includes("ba-candidate-view-all")) {
					return true
				}
				break
			case "ba-candidate-view-brand":
				if (permissionList.includes("ba-candidate-view-brand")) {
					if (hasTeamBrandPermission(userTeam, brandId)) {
						return true
					}
				}
				break
			default:
				break
		}
	}

	return false
}
