<template>
  <n-card class="bg-white border-0 shadow-sm">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">ยอดขายรายเดือน</h3>
        <n-select 
          v-model:value="selectedPeriod" 
          :options="periodOptions" 
          size="small"
          class="w-32"
        />
      </div>
    </template>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <n-spin />
    </div>
    
    <div v-else class="h-64">
      <!-- Chart Container -->
      <div class="relative h-full">
        <!-- Y-axis Labels -->
        <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>{{ formatCurrency(maxSales) }}</span>
          <span>{{ formatCurrency(maxSales * 0.75) }}</span>
          <span>{{ formatCurrency(maxSales * 0.5) }}</span>
          <span>{{ formatCurrency(maxSales * 0.25) }}</span>
          <span>0</span>
        </div>
        
        <!-- Chart Area -->
        <div class="ml-12 h-full flex items-end justify-between space-x-2">
          <div 
            v-for="(item, index) in data" 
            :key="index"
            class="flex flex-col items-center flex-1"
          >
            <!-- Bar -->
            <div class="w-full flex justify-center mb-2">
              <div 
                class="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm cursor-pointer hover:from-blue-600 hover:to-blue-500 transition-colors duration-200 relative group"
                :style="{ 
                  height: `${(item.sales / maxSales) * 200}px`, 
                  width: '80%',
                  minHeight: '4px' 
                }"
              >
                <!-- Tooltip -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div class="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    <div>ยอดขาย: {{ formatCurrency(item.sales) }}</div>
                    <div>คำสั่งซื้อ: {{ item.orders }} รายการ</div>
                  </div>
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            
            <!-- Month Label -->
            <span class="text-xs text-gray-600 font-medium">{{ item.month }}</span>
          </div>
        </div>
      </div>
      
      <!-- Summary -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <div class="text-center p-3 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-1">ยอดขายรวม</p>
          <p class="text-lg font-bold text-blue-600">{{ formatCurrency(totalSales) }}</p>
        </div>
        <div class="text-center p-3 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-1">คำสั่งซื้อรวม</p>
          <p class="text-lg font-bold text-green-600">{{ totalOrders }} รายการ</p>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NSelect, NSpin } from 'naive-ui'
import type { SalesData } from '@/types/dashboard'

// Props
interface Props {
  data: SalesData[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// Reactive state
const selectedPeriod = ref('6months')

const periodOptions = [
  { label: '6 เดือนล่าสุด', value: '6months' },
  { label: '1 ปีล่าสุด', value: '12months' },
  { label: 'ปีนี้', value: 'thisyear' }
]

// Computed
const maxSales = computed(() => {
  if (props.data.length === 0) return 200000
  return Math.max(...props.data.map(item => item.sales)) * 1.1
})

const totalSales = computed(() => {
  return props.data.reduce((sum, item) => sum + item.sales, 0)
})

const totalOrders = computed(() => {
  return props.data.reduce((sum, item) => sum + item.orders, 0)
})

// Methods
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>