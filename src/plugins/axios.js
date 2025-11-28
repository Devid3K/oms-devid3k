/// setup axios
import axios from "axios"
import router from "@/router"
/// create axios instance
const axiosIns = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL_BA_APP || ""}`
})
// Variables to manage token refresh


// Function to subscribe to token refresh

// Function to notify all subscribers about new token

// Add request interceptor
axiosIns.interceptors.request.use(
  config => {
    // Add the Authorization header to the request
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token")) || "xxx"}`

    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add response interceptor
axiosIns.interceptors.response.use(
  response => {
    // For non-GET methods, show success notification
    const { method } = response.config
    // show notification with method
    switch (method) {
      case "post":
      case "put":
      case "patch":
        window.$notification.success({
          content: "การบันทึกข้อมูลเสร็จสมบูรณ์",
          meta: response.data.message,
          duration: 2500,
          keepAliveOnHover: true
        })
        break
      case "delete":
        window.$notification.success({
          content: "การลบข้อมูลเสร็จสมบูรณ์",
          meta: response.data.message,
          duration: 2500,
          keepAliveOnHover: true
        })
        break
      default:
        break
    }
    // Return response
    return response
  },
  async error => {
    // Handle error
    // For non-GET methods, show error notification
    if (error.config.method !== "get") {
      // Show error notification
      window.$notification.error({
        content: "ทำรายการไม่สำเร็จ",
        meta: error.response.data.message_th || "Unknown error",
        duration: 2500,
        keepAliveOnHover: true
      })
    }
    console.log(error)
    if (error.status === 401) {
      console.log('ghs',error)
      // Redirect to logout page
      localStorage.clear()
      return window.location.href = "/login"
    }
    // Return error
    return Promise.reject(error)
  }
)
/// export axios instance
export default axiosIns
