import { defineStore } from 'pinia'
// import { ApiService } from '@/services/apiService'
import type { Order, OrdersResponse, OrderSearchParams } from '@/types/order'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: {
      message: '',
      statusCode: 0,
      data: [] as Order[],
      total: 0,
      page: '1',
      limit: '10'
    } as OrdersResponse,
    
    order: {} as Order,
    loading: false,
    error: null as string | null
  }),

  getters: {
    totalPages: (state) => Math.ceil(state.orders.total / parseInt(state.orders.limit)),
    currentPage: (state) => parseInt(state.orders.page),
    hasOrders: (state) => state.orders.data.length > 0
  },

  actions: {
    async getOrders(params: OrderSearchParams) {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Replace with actual API call
        // const resp = await ApiService.v1.Order.getOrders(params)
        // this.orders = resp.data
        // return resp

        // Mock API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Generate mock data based on search params
        const mockOrders: Order[] = [
          {
            id: '1',
            orderNumber: 'ORD-2024-001',
            customerName: 'สมชาย ใจดี',
            customerEmail: 'somchai@example.com',
            customerPhone: '0801234567',
            products: [
              {
                id: 'p1',
                productName: 'iPhone 15 Pro',
                productCode: 'IP15P',
                quantity: 1,
                unitPrice: 35000,
                totalPrice: 35000
              }
            ],
            totalAmount: 35000,
            status: 'completed',
            paymentStatus: 'paid',
            shippingAddress: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
            orderDate: '2024-11-28T10:30:00Z',
            updatedDate: '2024-11-28T15:45:00Z'
          },
          {
            id: '2',
            orderNumber: 'ORD-2024-002',
            customerName: 'สมหญิง รักษ์ดี',
            customerEmail: 'somying@example.com',
            customerPhone: '0812345678',
            products: [
              {
                id: 'p2',
                productName: 'MacBook Pro M3',
                productCode: 'MBP-M3',
                quantity: 1,
                unitPrice: 65000,
                totalPrice: 65000
              }
            ],
            totalAmount: 65000,
            status: 'processing',
            paymentStatus: 'paid',
            shippingAddress: '456 ถนนพหลโยธิน กรุงเทพฯ 10400',
            orderDate: '2024-11-28T09:15:00Z',
            notes: 'ขอส่งเร็วๆ'
          },
          {
            id: '3',
            orderNumber: 'ORD-2024-003',
            customerName: 'วิชัย มั่นคง',
            customerEmail: 'vichai@example.com',
            customerPhone: '0823456789',
            products: [
              {
                id: 'p3',
                productName: 'iPad Air',
                productCode: 'IPAD-AIR',
                quantity: 1,
                unitPrice: 25000,
                totalPrice: 25000
              }
            ],
            totalAmount: 25000,
            status: 'pending',
            paymentStatus: 'pending',
            shippingAddress: '789 ถนนรามคำแหง กรุงเทพฯ 10310',
            orderDate: '2024-11-28T08:45:00Z'
          },
          {
            id: '4',
            orderNumber: 'ORD-2024-004',
            customerName: 'มนทนา สุขใส',
            customerEmail: 'montana@example.com',
            customerPhone: '0834567890',
            products: [
              {
                id: 'p4',
                productName: 'AirPods Pro',
                productCode: 'APP',
                quantity: 2,
                unitPrice: 8500,
                totalPrice: 17000
              }
            ],
            totalAmount: 17000,
            status: 'shipped',
            paymentStatus: 'paid',
            shippingAddress: '321 ถนนลาดพร้าว กรุงเทพฯ 10230',
            orderDate: '2024-11-27T16:20:00Z'
          },
          {
            id: '5',
            orderNumber: 'ORD-2024-005',
            customerName: 'ประยุทธ มีสุข',
            customerEmail: 'prayuth@example.com',
            customerPhone: '0845678901',
            products: [
              {
                id: 'p5',
                productName: 'Apple Watch Series 9',
                productCode: 'AW9',
                quantity: 1,
                unitPrice: 15000,
                totalPrice: 15000
              }
            ],
            totalAmount: 15000,
            status: 'cancelled',
            paymentStatus: 'refunded',
            shippingAddress: '654 ถนนเจริญกรุง กรุงเทพฯ 10500',
            orderDate: '2024-11-27T14:10:00Z',
            notes: 'ลูกค้าขอยกเลิก'
          }
        ]

        // Apply filters
        let filteredOrders = mockOrders
        
        if (params.search) {
          const searchTerm = params.search.toLowerCase()
          filteredOrders = filteredOrders.filter(order => 
            order.orderNumber.toLowerCase().includes(searchTerm) ||
            order.customerName.toLowerCase().includes(searchTerm)
          )
        }
        
        if (params.status) {
          filteredOrders = filteredOrders.filter(order => order.status === params.status)
        }

        // Apply pagination
        const page = params.page || 1
        const limit = params.limit || 10
        const start = (page - 1) * limit
        const end = start + limit
        const paginatedOrders = filteredOrders.slice(start, end)

        this.orders = {
          message: 'success',
          statusCode: 200,
          data: paginatedOrders,
          total: filteredOrders.length,
          page: page.toString(),
          limit: limit.toString()
        }

        return { data: this.orders }
      } catch (error: any) {
        this.error = 'Failed to fetch orders'
        console.error(error.message_th || error)
      } finally {
        this.loading = false
      }
    },

    async getOrderById(id: string) {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Replace with actual API call
        // const resp = await ApiService.v1.Order.getOrderById(id)
        // this.order = resp.data.order
        // return resp

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockOrder: Order = {
          id,
          orderNumber: `ORD-2024-${id.padStart(3, '0')}`,
          customerName: 'ลูกค้าตัวอย่าง',
          customerEmail: 'customer@example.com',
          customerPhone: '0801234567',
          products: [
            {
              id: 'p1',
              productName: 'สินค้าตัวอย่าง',
              productCode: 'SAMPLE',
              quantity: 1,
              unitPrice: 1000,
              totalPrice: 1000
            }
          ],
          totalAmount: 1000,
          status: 'pending',
          paymentStatus: 'pending',
          shippingAddress: 'ที่อยู่ตัวอย่าง',
          orderDate: new Date().toISOString()
        }
        
        this.order = mockOrder
        return { data: { order: mockOrder } }
      } catch (error: any) {
        this.error = 'Failed to fetch order'
        console.error(error.message_th || error)
      } finally {
        this.loading = false
      }
    },

    async updateOrder(data: Partial<Order>) {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Replace with actual API call
        // await ApiService.v1.Order.updateOrder(data)

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Update local state if needed
        const index = this.orders.data.findIndex(order => order.id === data.id)
        if (index !== -1) {
          this.orders.data[index] = { ...this.orders.data[index], ...data }
        }
        
        return { message: 'Order updated successfully' }
      } catch (error: any) {
        this.error = 'Failed to update order'
        console.error(error.message_th || error)
      } finally {
        this.loading = false
      }
    },

    async deleteOrder(id: string) {
      try {
        this.loading = true
        this.error = null
        
        // TODO: Replace with actual API call
        // await ApiService.v1.Order.deleteOrder(id)

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Remove from local state
        this.orders.data = this.orders.data.filter(order => order.id !== id)
        this.orders.total = Math.max(0, this.orders.total - 1)
        
        return { message: 'Order deleted successfully' }
      } catch (error: any) {
        this.error = 'Failed to delete order'
        console.error(error.message_th || error)
      } finally {
        this.loading = false
      }
    }
  }
})