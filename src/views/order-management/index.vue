<template>
  <div class="min-h-screen bg-[#F9F8F6] p-4 md:p-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">จัดการคำสั่งซื้อ</h1>
      <p class="text-gray-600">รายการคำสั่งซื้อทั้งหมด</p>
    </div>

    <!-- Search and Filter Section -->
    <n-card class="mb-6 bg-white border-0 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ค้นหา</label>
          <n-input
            v-model:value="filters.search"
            placeholder="ค้นหาหมายเลขคำสั่งซื้อหรือชื่อลูกค้า"
            clearable
            @input="handleSearch"
            class="w-full"
          >
            <template #prefix>
              <div class="text-gray-400">🔍</div>
            </template>
          </n-input>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
          <n-select
            v-model:value="filters.status"
            :options="statusOptions"
            placeholder="เลือกสถานะ"
            clearable
            @update:value="handleStatusFilter"
            class="w-full"
          />
        </div>

        <!-- Payment Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">สถานะการชำระเงิน</label>
          <n-select
            v-model:value="filters.paymentStatus"
            :options="paymentStatusOptions"
            placeholder="เลือกสถานะการชำระ"
            clearable
            @update:value="handlePaymentStatusFilter"
            class="w-full"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div class="flex space-x-2">
          <n-button type="primary" @click="showCreateModal = true">
            ➕ เพิ่มคำสั่งซื้อ
          </n-button>
          <n-button type="primary" @click="refreshData">
            🔄 รีเฟรช
          </n-button>
          <n-button @click="clearFilters">
            🗑️ ล้างตัวกรอง
          </n-button>
        </div>
        <div class="text-sm text-gray-600">
          พบ {{ orderStore.orders.total }} รายการ
        </div>
      </div>
    </n-card>

    <!-- Orders Table -->
    <n-card class="bg-white border-0 shadow-sm">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">รายการคำสั่งซื้อ</h3>
        </div>
      </template>

      <!-- Loading State -->
      <div v-if="orderStore.loading" class="flex justify-center items-center py-12">
        <n-spin size="large" />
        <span class="ml-2 text-gray-600">กำลังโหลดข้อมูล...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="orderStore.error" class="text-center py-12">
        <div class="text-red-500 mb-4">❌ เกิดข้อผิดพลาด</div>
        <p class="text-gray-600 mb-4">{{ orderStore.error }}</p>
        <n-button @click="refreshData">ลองใหม่</n-button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!orderStore.hasOrders" class="text-center py-12">
        <div class="text-gray-400 mb-4 text-4xl">📦</div>
        <p class="text-gray-600 mb-4">ไม่มีคำสั่งซื้อ</p>
        <n-button @click="clearFilters">ล้างตัวกรอง</n-button>
      </div>

      <!-- Orders Table -->
      <div v-else class="overflow-x-auto">
        <n-data-table
          :columns="tableColumns"
          :data="orderStore.orders.data"
          :loading="orderStore.loading"
          :pagination="false"
          :scroll-x="1200"
          size="medium"
          striped
        />

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <div class="text-sm text-gray-600">
            แสดง {{ startRecord }}-{{ endRecord }} จาก {{ orderStore.orders.total }} รายการ
          </div>
          <n-pagination
            v-model:page="currentPage"
            :page-count="orderStore.totalPages"
            :page-size="parseInt(orderStore.orders.limit)"
            :show-size-picker="true"
            :page-sizes="[5, 10, 20, 50]"
            @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange"
            show-quick-jumper
          />
        </div>
      </div>
    </n-card>

    <!-- Create Order Modal -->
    <n-modal v-model:show="showCreateModal" :mask-closable="false" style="width: 90%; max-width: 1200px">
      <n-card 
        title="เพิ่มคำสั่งซื้อใหม่" 
        :bordered="false" 
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          <n-button quaternary circle @click="showCreateModal = false">
            ✕
          </n-button>
        </template>

        <n-form ref="createFormRef" :model="newOrderForm" :rules="formRules" size="medium">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Order Information -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold mb-4 text-gray-800">ข้อมูลคำสั่งซื้อ</h4>
                
                <n-form-item label="รหัสคำสั่งซื้อ" path="order_code">
                  <n-input v-model:value="newOrderForm.order_code" placeholder="เช่น SHPxxx1011" />
                </n-form-item>

                <n-form-item label="รหัสส่วนลด" path="discount_code">
                  <n-input v-model:value="newOrderForm.discount_code" placeholder="รหัสส่วนลด (ถ้ามี)" />
                </n-form-item>

                <n-form-item label="จำนวนส่วนลด" path="total_discount">
                  <n-input-number 
                    v-model:value="newOrderForm.total_discount" 
                    placeholder="0"
                    :min="0"
                    class="w-full"
                  />
                </n-form-item>
              </div>

              <!-- Platform Provider -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold mb-4 text-gray-800">แพลตฟอร์ม</h4>
                
                <n-form-item label="ชื่อแพลตฟอร์ม" path="platform_provider.name">
                  <n-select
                    v-model:value="newOrderForm.platform_provider.name"
                    :options="platformOptions"
                    placeholder="เลือกแพลตฟอร์ม"
                    @update:value="updatePlatformCode"
                  />
                </n-form-item>

                <n-form-item label="รหัสแพลตฟอร์ม" path="platform_provider.code">
                  <n-input v-model:value="newOrderForm.platform_provider.code" placeholder="รหัสแพลตฟอร์ม" />
                </n-form-item>
              </div>

              <!-- My Merchant -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold mb-4 text-gray-800">ข้อมูลร้านค้า</h4>
                
                <n-form-item label="ชื่อร้าน" path="my_merchant.name">
                  <n-input v-model:value="newOrderForm.my_merchant.name" placeholder="ชื่อร้านค้า" />
                </n-form-item>

                <n-form-item label="เบอร์โทรร้าน" path="my_merchant.phone">
                  <n-input v-model:value="newOrderForm.my_merchant.phone" placeholder="เบอร์โทรศัพท์" />
                </n-form-item>

                <n-form-item label="อีเมลร้าน" path="my_merchant.email">
                  <n-input v-model:value="newOrderForm.my_merchant.email" placeholder="อีเมล (ถ้ามี)" />
                </n-form-item>

                <n-form-item label="ที่อยู่ร้าน" path="my_merchant.address">
                  <n-input 
                    v-model:value="newOrderForm.my_merchant.address" 
                    type="textarea" 
                    placeholder="ที่อยู่ร้านค้า"
                    :rows="2"
                  />
                </n-form-item>

                <n-form-item label="อันดับร้าน" path="my_merchant.rank">
                  <n-input-number 
                    v-model:value="newOrderForm.my_merchant.rank" 
                    placeholder="อันดับ"
                    :min="1"
                    class="w-full"
                  />
                </n-form-item>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Customer Information -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold mb-4 text-gray-800">ข้อมูลลูกค้า</h4>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <n-form-item label="ชื่อ" path="customer.first_name">
                    <n-input v-model:value="newOrderForm.customer.first_name" placeholder="ชื่อจริง" />
                  </n-form-item>

                  <n-form-item label="นามสกุล" path="customer.last_name">
                    <n-input v-model:value="newOrderForm.customer.last_name" placeholder="นามสกุล" />
                  </n-form-item>
                </div>

                <n-form-item label="เบอร์โทร" path="customer.phone">
                  <n-input v-model:value="newOrderForm.customer.phone" placeholder="เบอร์โทรศัพท์" />
                </n-form-item>

                <n-form-item label="อีเมล" path="customer.email">
                  <n-input v-model:value="newOrderForm.customer.email" placeholder="อีเมล" />
                </n-form-item>

                <n-form-item label="หมายเหตุ" path="customer.comment">
                  <n-input 
                    v-model:value="newOrderForm.customer.comment" 
                    type="textarea" 
                    placeholder="หมายเหตุเพิ่มเติม เช่น ส่งใต้ถุน"
                    :rows="3"
                  />
                </n-form-item>
              </div>

              <!-- Order Details -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-lg font-semibold text-gray-800">รายการสินค้า</h4>
                  <n-button @click="addOrderItem" size="small" type="primary">
                    ➕ เพิ่มสินค้า
                  </n-button>
                </div>

                <n-dynamic-input 
                  v-model:value="newOrderForm.order_detail"
                  :on-create="createOrderItem"
                  #="{ index, value }"
                  :min="1"
                >
                  <div class="bg-white p-4 rounded border space-y-3">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <n-form-item :label="`ชื่อสินค้า ${index + 1}`" ignore-path-change>
                        <n-input v-model:value="value.name" placeholder="ชื่อสินค้า" />
                      </n-form-item>

                      <n-form-item :label="`รหัสสินค้า ${index + 1}`" ignore-path-change>
                        <n-input v-model:value="value.product_id" placeholder="รหัสสินค้า" />
                      </n-form-item>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <n-form-item label="ราคาต่อหน่วย" ignore-path-change>
                        <n-input-number 
                          v-model:value="value.price" 
                          placeholder="0"
                          :min="0"
                          class="w-full"
                          @update:value="updateItemTotal(index)"
                        />
                      </n-form-item>

                      <n-form-item label="จำนวน" ignore-path-change>
                        <n-input-number 
                          v-model:value="value.count" 
                          placeholder="1"
                          :min="1"
                          class="w-full"
                          @update:value="updateItemTotal(index)"
                        />
                      </n-form-item>

                      <n-form-item label="สถานะสต๊อก" ignore-path-change>
                        <n-select
                          v-model:value="value.status"
                          :options="stockStatusOptions"
                          placeholder="สถานะ"
                        />
                      </n-form-item>
                    </div>

                    <n-form-item label="หมายเหตุ" ignore-path-change>
                      <n-input v-model:value="value.remark" placeholder="หมายเหตุ (ถ้ามี)" />
                    </n-form-item>

                    <div class="text-right text-sm text-gray-600">
                      รวม: <span class="font-bold">{{ formatCurrency((value.price || 0) * (value.count || 1)) }}</span>
                    </div>
                  </div>
                </n-dynamic-input>
              </div>

              <!-- Total Summary -->
              <div class="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h4 class="text-lg font-semibold mb-3 text-blue-800">สรุปยอดรวม</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span>ยอดรวมสินค้า:</span>
                    <span class="font-medium">{{ formatCurrency(calculateSubtotal()) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>ส่วนลด:</span>
                    <span class="font-medium text-red-600">- {{ formatCurrency(newOrderForm.total_discount || 0) }}</span>
                  </div>
                  <n-divider class="my-2" />
                  <div class="flex justify-between text-lg font-bold text-blue-800">
                    <span>ยอดรวมสุทธิ:</span>
                    <span>{{ formatCurrency(calculateTotal()) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-form>

        <template #action>
          <n-space justify="end">
            <n-button @click="showCreateModal = false">ยกเลิก</n-button>
            <n-button type="primary" @click="handleCreateOrder" :loading="orderStore.loading">
              💾 บันทึกคำสั่งซื้อ
            </n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>

    <!-- Delete Confirmation Modal -->
    <n-modal v-model:show="showDeleteModal" preset="dialog" title="ยืนยันการลบ">
      <template #header>
        <div class="flex items-center">
          <span class="text-red-500 mr-2">⚠️</span>
          ยืนยันการลบคำสั่งซื้อ
        </div>
      </template>
      <p>คุณแน่ใจหรือไม่ที่จะลบคำสั่งซื้อ <strong>{{ selectedOrder?.orderNumber }}</strong>?</p>
      <p class="text-sm text-gray-600 mt-2">การดำเนินการนี้ไม่สามารถยกเลิกได้</p>
      <template #action>
        <n-button @click="showDeleteModal = false">ยกเลิก</n-button>
        <n-button type="error" @click="confirmDelete" :loading="orderStore.loading">
          ลบ
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { 
  NCard, 
  NInput, 
  NSelect, 
  NButton, 
  NSpin, 
  NDataTable, 
  NPagination,
  NModal,
  NTag,
  NDropdown,
  NForm,
  NFormItem,
  NDynamicInput,
  NInputNumber,
  NSpace,
  NDivider,
  useMessage,
  type DataTableColumns
} from 'naive-ui'
import { useOrderStore } from '../../stores/order'
import type { Order, OrderFilters, OrderStatus, PaymentStatus, NewOrder, OrderDetail, PlatformProvider, Customer, MyMerchant } from '@/types/order'

// Stores and composables
const orderStore = useOrderStore()
const router = useRouter()
const message = useMessage()

// Reactive state
const filters = ref<OrderFilters>({
  search: '',
  status: null,
  paymentStatus: null
})

const currentPage = ref(1)
const showDeleteModal = ref(false)
const showCreateModal = ref(false)
const selectedOrder = ref<Order | null>(null)

// Form state
const createFormRef = ref()
const newOrderForm = ref<NewOrder>({
  order_code: '',
  order_detail: [{
    name: '',
    product_id: '',
    price: 0,
    count: 1,
    status: 'in stock',
    is_delete: 0,
    is_active: 1,
    remark: ''
  }],
  total_amount: 0,
  discount_code: '',
  total_discount: 0,
  platform_provider: {
    name: '',
    code: ''
  },
  customer: {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    comment: ''
  },
  my_merchant: {
    name: '',
    phone: '',
    email: '',
    address: '',
    rank: undefined
  }
})

// Options for dropdowns
const statusOptions = [
  { label: 'รอดำเนินการ', value: 'pending' },
  { label: 'ยืนยันแล้ว', value: 'confirmed' },
  { label: 'กำลังดำเนินการ', value: 'processing' },
  { label: 'จัดส่งแล้ว', value: 'shipped' },
  { label: 'ส่งถึงแล้ว', value: 'delivered' },
  { label: 'สำเร็จ', value: 'completed' },
  { label: 'ยกเลิก', value: 'cancelled' },
  { label: 'คืนเงินแล้ว', value: 'refunded' }
]

const paymentStatusOptions = [
  { label: 'รอชำระ', value: 'pending' },
  { label: 'ชำระแล้ว', value: 'paid' },
  { label: 'ชำระไม่สำเร็จ', value: 'failed' },
  { label: 'คืนเงินแล้ว', value: 'refunded' }
]

const platformOptions = [
  { label: 'Shopee', value: 'shopee' },
  { label: 'Lazada', value: 'lazada' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'LINE Official', value: 'line' },
  { label: 'Website', value: 'website' },
  { label: 'อื่นๆ', value: 'others' }
]

const stockStatusOptions = [
  { label: 'มีสินค้า', value: 'in stock' },
  { label: 'สินค้าหมด', value: 'out of stock' },
  { label: 'รอของเข้า', value: 'pending' }
]

// Form validation rules
const formRules = {
  order_code: { required: true, message: 'กรุณากรอกรหัสคำสั่งซื้อ', trigger: 'blur' },
  'platform_provider.name': { required: true, message: 'กรุณาเลือกแพลตฟอร์ม', trigger: 'change' },
  'customer.first_name': { required: true, message: 'กรุณากรอกชื่อลูกค้า', trigger: 'blur' },
  'customer.last_name': { required: true, message: 'กรุณากรอกนามสกุลลูกค้า', trigger: 'blur' },
  'customer.phone': { required: true, message: 'กรุณากรอกเบอร์โทรลูกค้า', trigger: 'blur' },
  'customer.email': { required: true, message: 'กรุณากรอกอีเมลลูกค้า', trigger: 'blur' },
  'my_merchant.name': { required: true, message: 'กรุณากรอกชื่อร้าน', trigger: 'blur' }
}

// Table columns
const tableColumns: DataTableColumns<Order> = [
  {
    title: 'หมายเลขคำสั่งซื้อ',
    key: 'orderNumber',
    width: 140,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'ชื่อลูกค้า',
    key: 'customerName',
    width: 150,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'จำนวนเงิน',
    key: 'totalAmount',
    width: 120,
    render: (row) => formatCurrency(row.totalAmount)
  },
  {
    title: 'สถานะ',
    key: 'status',
    width: 120,
    render: (row) => h(NTag, { type: getStatusTagType(row.status) }, { default: () => getStatusText(row.status) })
  },
  {
    title: 'สถานะการชำระ',
    key: 'paymentStatus',
    width: 130,
    render: (row) => h(NTag, { type: getPaymentStatusTagType(row.paymentStatus) }, { default: () => getPaymentStatusText(row.paymentStatus) })
  },
  {
    title: 'วันที่สั่งซื้อ',
    key: 'orderDate',
    width: 120,
    render: (row) => formatDate(row.orderDate)
  },
  {
    title: 'การดำเนินการ',
    key: 'actions',
    width: 120,
    render: (row) => {
      const actionOptions = [
        {
          label: 'ดูรายละเอียด',
          key: 'view',
          icon: () => '👁️'
        },
        {
          label: 'แก้ไข',
          key: 'edit',
          icon: () => '✏️'
        },
        {
          label: 'ลบ',
          key: 'delete',
          icon: () => '🗑️'
        }
      ]

      return h(
        NDropdown,
        {
          options: actionOptions,
          onSelect: (key: string) => handleAction(key, row)
        },
        {
          default: () => h(NButton, { size: 'small' }, { default: () => 'เลือก' })
        }
      )
    }
  }
]

// Computed properties
const startRecord = computed(() => {
  const page = parseInt(orderStore.orders.page)
  const limit = parseInt(orderStore.orders.limit)
  return (page - 1) * limit + 1
})

const endRecord = computed(() => {
  const page = parseInt(orderStore.orders.page)
  const limit = parseInt(orderStore.orders.limit)
  return Math.min(page * limit, orderStore.orders.total)
})

// Methods
const fetchOrders = async () => {
  const params = {
    search: filters.value.search || undefined,
    status: (filters.value.status as OrderStatus) || undefined,
    paymentStatus: (filters.value.paymentStatus as PaymentStatus) || undefined,
    page: currentPage.value,
    limit: parseInt(orderStore.orders.limit)
  }
  
  await orderStore.getOrders(params)
}

const handleSearch = debounce(() => {
  currentPage.value = 1
  fetchOrders()
}, 500)

const handleStatusFilter = () => {
  currentPage.value = 1
  fetchOrders()
}

const handlePaymentStatusFilter = () => {
  currentPage.value = 1
  fetchOrders()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchOrders()
}

const handlePageSizeChange = (pageSize: number) => {
  orderStore.orders.limit = pageSize.toString()
  currentPage.value = 1
  fetchOrders()
}

const refreshData = () => {
  fetchOrders()
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    paymentStatus: ''
  }
  currentPage.value = 1
  fetchOrders()
}

const handleAction = (action: string, order: Order) => {
  switch (action) {
    case 'view':
      router.push(`/order-management/detail/${order.id}`)
      break
    case 'edit':
      router.push(`/order-management/edit/${order.id}`)
      break
    case 'delete':
      selectedOrder.value = order
      showDeleteModal.value = true
      break
  }
}

const confirmDelete = async () => {
  if (!selectedOrder.value) return
  
  try {
    await orderStore.deleteOrder(selectedOrder.value.id)
    message.success('ลบคำสั่งซื้อเรียบร้อยแล้ว')
    showDeleteModal.value = false
    selectedOrder.value = null
    await fetchOrders() // Refresh data
  } catch (error) {
    message.error('เกิดข้อผิดพลาดในการลบคำสั่งซื้อ')
  }
}

// Form methods
const createOrderItem = (): OrderDetail => ({
  name: '',
  product_id: '',
  price: 0,
  count: 1,
  status: 'in stock',
  is_delete: 0,
  is_active: 1,
  remark: ''
})

const addOrderItem = () => {
  newOrderForm.value.order_detail.push(createOrderItem())
}

const updatePlatformCode = (value: string) => {
  const codeMap: Record<string, string> = {
    'shopee': 'shopee1101',
    'lazada': 'lazada2202', 
    'facebook': 'fb3303',
    'line': 'line4404',
    'website': 'web5505',
    'others': 'other9999'
  }
  newOrderForm.value.platform_provider.code = codeMap[value] || ''
}

const updateItemTotal = (index: number) => {
  // This triggers reactivity for total calculation
  const item = newOrderForm.value.order_detail[index]
  if (item) {
    // Auto-calculate total when price or count changes
    newOrderForm.value.total_amount = calculateTotal()
  }
}

const calculateSubtotal = (): number => {
  return newOrderForm.value.order_detail.reduce((sum, item) => {
    return sum + ((item.price || 0) * (item.count || 1))
  }, 0)
}

const calculateTotal = (): number => {
  const subtotal = calculateSubtotal()
  const discount = newOrderForm.value.total_discount || 0
  return Math.max(0, subtotal - discount)
}

const resetForm = () => {
  newOrderForm.value = {
    order_code: '',
    order_detail: [createOrderItem()],
    total_amount: 0,
    discount_code: '',
    total_discount: 0,
    platform_provider: {
      name: '',
      code: ''
    },
    customer: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      comment: ''
    },
    my_merchant: {
      name: '',
      phone: '',
      email: '',
      address: '',
      rank: undefined
    }
  }
}

const handleCreateOrder = async () => {
  try {
    // Validate form
    await createFormRef.value?.validate()
    
    // Update total amount
    newOrderForm.value.total_amount = calculateTotal()
    
    // Set auto-generated fields
    newOrderForm.value.customer.create_at = new Date().toISOString()
    
    // TODO: Replace with actual API call
    // await orderStore.createOrder(newOrderForm.value)
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    message.success('สร้างคำสั่งซื้อเรียบร้อยแล้ว')
    showCreateModal.value = false
    resetForm()
    await fetchOrders() // Refresh data
  } catch (error) {
    console.error('Validation failed:', error)
    message.error('กรุณาตรวจสอบข้อมูลให้ครบถ้วน')
  }
}

// Utility functions
const getStatusText = (status: OrderStatus): string => {
  const statusMap = {
    'pending': 'รอดำเนินการ',
    'confirmed': 'ยืนยันแล้ว', 
    'processing': 'กำลังดำเนินการ',
    'shipped': 'จัดส่งแล้ว',
    'delivered': 'ส่งถึงแล้ว',
    'completed': 'สำเร็จ',
    'cancelled': 'ยกเลิก',
    'refunded': 'คืนเงินแล้ว'
  }
  return statusMap[status] || status
}

const getStatusTagType = (status: OrderStatus): 'error' | 'default' | 'warning' | 'info' | 'success' | 'primary' => {
  const typeMap = {
    'pending': 'warning' as const,
    'confirmed': 'info' as const,
    'processing': 'info' as const,
    'shipped': 'info' as const, 
    'delivered': 'success' as const,
    'completed': 'success' as const,
    'cancelled': 'error' as const,
    'refunded': 'error' as const
  }
  return typeMap[status] || 'default'
}

const getPaymentStatusText = (status: PaymentStatus): string => {
  const statusMap = {
    'pending': 'รอชำระ',
    'paid': 'ชำระแล้ว',
    'failed': 'ชำระไม่สำเร็จ',
    'refunded': 'คืนเงินแล้ว'
  }
  return statusMap[status] || status
}

const getPaymentStatusTagType = (status: PaymentStatus): 'error' | 'default' | 'warning' | 'info' | 'success' | 'primary' => {
  const typeMap = {
    'pending': 'warning' as const,
    'paid': 'success' as const,
    'failed': 'error' as const,
    'refunded': 'error' as const
  }
  return typeMap[status] || 'default'
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Debounce helper
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Lifecycle
onMounted(() => {
  fetchOrders()
})
</script>