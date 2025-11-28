import { defineStore } from 'pinia'
import type { OrderStats, SalesData, RecentOrder } from '@/types/dashboard'

export const useDashboardStore = defineStore('dashboardStore', {
  state: () => ({
    orderStats: {
      total: 0,
      pending: 0,
      completed: 0,
      cancelled: 0
    } as OrderStats,
    
    salesData: [] as SalesData[],
    recentOrders: [] as RecentOrder[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    completionRate: (state) => {
      const total = state.orderStats.total
      return total > 0 ? Math.round((state.orderStats.completed / total) * 100) : 0
    },

    totalSales: (state) => {
      return state.salesData.reduce((sum, item) => sum + item.sales, 0)
    }
  },

  actions: {
    async fetchOrderStats() {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Replace with actual API call
        // const resp = await ApiService.v1.Dashboard.getOrderStats()
        // this.orderStats = resp.data
        
        // Mock API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.orderStats = {
          total: 1250,
          pending: 85,
          completed: 1050,
          cancelled: 115
        }
      } catch (error: any) {
        this.error = 'Failed to fetch order statistics'
        console.error('Error fetching order stats:', error.message_th || error)
      } finally {
        this.loading = false
      }
    },

    async fetchSalesData() {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Replace with actual API call
        // const resp = await ApiService.v1.Dashboard.getSalesData()
        // this.salesData = resp.data
        
        // Mock API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 800))
        
        this.salesData = [
          { month: 'ม.ค.', sales: 120000, orders: 85 },
          { month: 'ก.พ.', sales: 135000, orders: 92 },
          { month: 'มี.ค.', sales: 148000, orders: 98 },
          { month: 'เม.ย.', sales: 162000, orders: 105 },
          { month: 'พ.ค.', sales: 175000, orders: 115 },
          { month: 'มิ.ย.', sales: 188000, orders: 125 }
        ]
      } catch (error: any) {
        this.error = 'Failed to fetch sales data'
        console.error('Error fetching sales data:', error.message_th || error)
      } finally {
        this.loading = false
      }
    },

    async fetchRecentOrders() {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Replace with actual API call
        // const resp = await ApiService.v1.Dashboard.getRecentOrders()
        // this.recentOrders = resp.data
        
        // Mock API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 600))
        
        this.recentOrders = [
          {
            id: 'ORD-001',
            customerName: 'สมชาย ใจดี',
            product: 'โทรศัพท์มือถือ iPhone 15',
            amount: 35000,
            status: 'completed',
            createdAt: '2024-11-28T10:30:00Z'
          },
          {
            id: 'ORD-002',
            customerName: 'สมหญิง รักษ์ดี',
            product: 'แล็ปท็อป MacBook Pro',
            amount: 65000,
            status: 'processing',
            createdAt: '2024-11-28T09:15:00Z'
          },
          {
            id: 'ORD-003',
            customerName: 'วิชัย มั่นคง',
            product: 'แท็บเล็ต iPad Air',
            amount: 25000,
            status: 'pending',
            createdAt: '2024-11-28T08:45:00Z'
          },
          {
            id: 'ORD-004',
            customerName: 'มนทนา สุขใส',
            product: 'หูฟัง AirPods Pro',
            amount: 8500,
            status: 'completed',
            createdAt: '2024-11-27T16:20:00Z'
          },
          {
            id: 'ORD-005',
            customerName: 'ประยุทธ มีสุข',
            product: 'นาฬิกา Apple Watch',
            amount: 15000,
            status: 'cancelled',
            createdAt: '2024-11-27T14:10:00Z'
          }
        ]
      } catch (error: any) {
        this.error = 'Failed to fetch recent orders'
        console.error('Error fetching recent orders:', error.message_th || error)
      } finally {
        this.loading = false
      }
    },

    async refreshDashboard() {
      await Promise.all([
        this.fetchOrderStats(),
        this.fetchSalesData(),
        this.fetchRecentOrders()
      ])
    }
  }
})