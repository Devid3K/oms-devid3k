// Dashboard Types
export interface OrderStats {
  total: number
  pending: number
  completed: number
  cancelled: number
}

export interface SalesData {
  month: string
  sales: number
  orders: number
}

export interface RecentOrder {
  id: string
  customerName: string
  product: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'