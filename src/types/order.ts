// Order Management Types
export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  products: OrderProduct[]
  totalAmount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: string
  orderDate: string
  updatedDate?: string
  notes?: string
}

export interface OrderProduct {
  id: string
  productName: string
  productCode?: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type OrderStatus = 
  | 'pending'      // รอดำเนินการ
  | 'confirmed'    // ยืนยันแล้ว
  | 'processing'   // กำลังดำเนินการ
  | 'shipped'      // จัดส่งแล้ว
  | 'delivered'    // ส่งถึงแล้ว
  | 'completed'    // สำเร็จ
  | 'cancelled'    // ยกเลิก
  | 'refunded'     // คืนเงินแล้ว

export type PaymentStatus = 
  | 'pending'      // รอชำระ
  | 'paid'         // ชำระแล้ว
  | 'failed'       // ชำระไม่สำเร็จ
  | 'refunded'     // คืนเงินแล้ว

export interface OrdersResponse {
  message: string
  statusCode: number
  data: Order[]
  total: number
  page: string
  limit: string
}

export interface OrderSearchParams {
  search?: string
  status?: OrderStatus | ''
  paymentStatus?: PaymentStatus | ''
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface OrderFilters {
  search: string
  status: OrderStatus | '' | null
  paymentStatus: PaymentStatus | '' | null
}

// New Order Structure based on requirements
export interface NewOrder {
  id?: number
  order_code: string
  order_detail: OrderDetail[]
  total_amount: number
  discount_code?: string
  total_discount: number
  platform_provider: PlatformProvider
  customer: Customer
  my_merchant: MyMerchant
}

export interface OrderDetail {
  id?: number
  name: string
  product_id: string
  price: number
  count: number
  status: string
  is_delete?: number
  is_active?: number
  remark?: string
}

export interface PlatformProvider {
  id?: number
  name: string
  code: string
}

export interface Customer {
  id?: number
  code?: string
  first_name: string
  last_name: string
  phone: string
  email: string
  comment?: string
  create_at?: string
}

export interface MyMerchant {
  id?: number
  name: string
  phone: string
  email?: string
  address: string
  rank?: number
}