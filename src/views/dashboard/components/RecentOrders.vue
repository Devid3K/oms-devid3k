<template>
  <n-card class="bg-white border-0 shadow-sm">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">คำสั่งซื้อล่าสุด</h3>
        <n-button text class="text-blue-600 hover:text-blue-700">
          ดูทั้งหมด
        </n-button>
      </div>
    </template>
    
    <div v-if="loading" class="flex justify-center items-center h-48">
      <n-spin />
    </div>
    
    <div v-else-if="orders.length === 0" class="text-center py-8 text-gray-500">
      ไม่มีคำสั่งซื้อ
    </div>
    
    <div v-else class="space-y-3">
      <div 
        v-for="order in displayOrders" 
        :key="order.id"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
      >
        <div class="flex items-center space-x-3 flex-1">
          <!-- Status Indicator -->
          <div 
            class="w-3 h-3 rounded-full flex-shrink-0"
            :class="getStatusColor(order.status)"
          ></div>
          
          <!-- Order Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h4 class="text-sm font-medium text-gray-900 truncate">
                {{ order.customerName }}
              </h4>
              <span class="text-xs text-gray-500 ml-2 flex-shrink-0">
                {{ formatDate(order.createdAt) }}
              </span>
            </div>
            <p class="text-xs text-gray-600 truncate">{{ order.product }}</p>
            <div class="flex items-center justify-between mt-1">
              <span class="text-sm font-semibold text-blue-600">
                {{ formatCurrency(order.amount) }}
              </span>
              <n-tag 
                :type="getStatusTagType(order.status)" 
                size="small"
                class="flex-shrink-0"
              >
                {{ getStatusText(order.status) }}
              </n-tag>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Show More Button -->
      <div v-if="orders.length > 5" class="text-center pt-3 border-t border-gray-200">
        <n-button 
          text 
          class="text-blue-600 hover:text-blue-700"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'แสดงน้อยลง' : `แสดงเพิ่มเติม (${orders.length - 5})` }}
        </n-button>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NSpin, NTag } from 'naive-ui'
import type { RecentOrder } from '@/types/dashboard'

// Props
interface Props {
  orders: RecentOrder[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// Reactive state
const showAll = ref(false)

// Computed
const displayOrders = computed(() => {
  return showAll.value ? props.orders : props.orders.slice(0, 5)
})

// Methods
const getStatusColor = (status: string): string => {
  const colors = {
    'pending': 'bg-yellow-400',
    'processing': 'bg-blue-400',
    'completed': 'bg-green-400',
    'cancelled': 'bg-red-400'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-400'
}

const getStatusTagType = (status: string): 'success' | 'warning' | 'error' | 'info' => {
  const types = {
    'pending': 'warning' as const,
    'processing': 'info' as const,
    'completed': 'success' as const,
    'cancelled': 'error' as const
  }
  return types[status as keyof typeof types] || 'info'
}

const getStatusText = (status: string): string => {
  const texts = {
    'pending': 'รอดำเนินการ',
    'processing': 'กำลังดำเนินการ',
    'completed': 'สำเร็จ',
    'cancelled': 'ยกเลิก'
  }
  return texts[status as keyof typeof texts] || status
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
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return 'เพิ่งเข้ามา'
  } else if (diffInHours < 24) {
    return `${diffInHours} ชั่วโมงที่แล้ว`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} วันที่แล้ว`
  }
}
</script>