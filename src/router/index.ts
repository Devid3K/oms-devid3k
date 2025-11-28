import { createRouter, createWebHistory } from "vue-router"
import BlankPage from "@/views/BlankPage.vue"
import { Layout } from "@/types/theme.d"
import { authCheck } from "@/utils/auth"
import type { FormType } from "@/components/AuthForm/index.vue"
import { useHead } from '@unhead/vue'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL || "/"),
	routes: [
		{
			path: "/",
			redirect: "/profile",
			meta: { title: "Blank page", auth: true, roles: "all" },
		},
		{
			path: "/profile",
			name: "Profile",
			component: () => import("@/views/Profile.vue"),
			meta: { title: "Profile", auth: true, roles: "all" }
		},
		{
			path: "/login",
			name: "Login",
			component: () => import("@/views/Auth/Login.vue"),
			meta: { title: "Login", forceLayout: Layout.Blank, checkAuth: true }
		},
		{
			path: "/register",
			name: "Register",
			component: () => import("@/views/Auth/Login.vue"),
			props: { formType: "signup" as FormType },
			meta: { title: "Register", forceLayout: Layout.Blank, checkAuth: true }
		},
		{
			path: "/forgot-password",
			name: "ForgotPassword",
			component: () => import("@/views/Auth/Login.vue"),
			props: { formType: "forgotpassword" as FormType },
			meta: { title: "Forgot Password", forceLayout: Layout.Blank, checkAuth: true }
		},
		{
			path: "/logout",
			name: "Logout",
			component: () => import("@/views/Auth/Logout.vue"),
			meta: { title: "Logout", forceLayout: Layout.Blank, checkAuth: true }
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: () => import("@/views/dashboard/index.vue"),
			meta: { title: "Dashboard", auth: true, }
		},
		{
			path: "/order-management",
			name: "order-management",
			component: () => import("@/views/order-management/index.vue"),
			meta: { title: "Order Management", auth: true, }
		},
	// 	{
	// 		path: "/workspace",
	// 		name: "workspace",
	// 		component: () => import("@/views/BaApp/Workspace/index.vue"),
	// 		meta: { title: "Workspace", auth: true, }
	// 	},
	// 	{
	// 		path: "/candidate",
	// 		name: "candidate",
	// 		component: () => import("@/views/BaApp/Candidate/index.vue"),
	// 		meta: { title: "Candidate", auth: true, }
	// 	},
	// 	{
	// 		path: "/ba/point/:id",
	// 		name: "point",
	// 		component: () => import("@/views/BaApp/BA/point.vue"),
	// 		meta: { title: "Point", auth: true, }
	// 	},
	// 	{
	// 		path: "/ba",
	// 		name: "ba",
	// 		component: () => import("@/views/BaApp/BA/index.vue"),
	// 		meta: { title: "BA", auth: true, }
	// 	},
	// 	{
	// 		path: "/incident-management",
	// 		name: "incident-management",
	// 		component: () => import("@/views/IncidentManagement/index.vue"),
	// 		meta: { title: "Incident Management", auth: true, }
	// 	},
	// 	{
	// 		path: "/review",
	// 		name: "review",
	// 		component: () => import("@/views/Review/index.vue"),
	// 		meta: { title: "review", auth: true, }
	// 	},
	// 	{
	// 		path: "/:pathMatch(.*)*",
	// 		name: "NotFound",
	// 		component: () => import("@/views/NotFound.vue"),
	// 		meta: { forceLayout: Layout.Blank }
	// 	},
	// 	{
	// 		path: "/user-management/user",
	// 		name: "user-management-user",
	// 		component: () => import("@/views/UserManagement/User/index.vue"),
	// 		meta: { title: "User Management User", auth: true }
	// 	},
	// 	{
	// 		path: "/user-management/team",
	// 		name: "team",
	// 		component: () => import("@/views/UserManagement/Team/index.vue"),
	// 		meta: { title: "Team", auth: true }
	// 	},
	// 	{
	// 		path: "/user-management/role",
	// 		name: "role",
	// 		component: () => import("@/views/UserManagement/Role/index.vue"),
	// 		meta: { title: "Role", auth: true }
	// 	},
	// 	{
	// 		path:"/system-master-data/general-data",
	// 		name:"general-data",
	// 		component: () => import("@/views/SystemMasterData/GeneralData/index.vue"),
	// 		meta: { title: "System Master Data", auth: true }
	// 	},
	// 	{
	// 		path:"/system-master-data/topic-data",
	// 		name:"topic-data",
	// 		component: () => import("@/views/SystemMasterData/TopicData/index.vue"),
	// 		meta: { title: "System Master Data", auth: true }
	// 	},
	// 	{
	// 		path: "/payment-history",
	// 		name: "payment-history",
	// 		component: () => import("@/views/BaApp/PaymentHistory/index.vue"),
	// 		meta: { title: "Payment History", auth: true, }
	// 	},
	// 	{
	// 		path: "/incident-management/payment-detail",
	// 		name: "payment-detail",
	// 		component: () => import("@/views/IncidentManagement/payment-detail.vue"),
	// 		meta: { title: "Incident Payment Detail", auth: true, }
	// 	},
]
})
// (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext)
router.beforeEach((to: RouteLocationNormalized) => {
	useHead({
		title: to.meta.title as string || "Vue 3 Starter",
		meta: to.meta.meta as any || [],
	})
	return authCheck(to)
})

export default router
