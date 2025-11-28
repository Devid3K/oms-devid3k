<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <!-- Total Orders Card -->
    <n-card class="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">คำสั่งซื้อทั้งหมด</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ loading ? '---' : formatNumber(stats.total) }}
          </p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <div class="text-2xl">📊</div>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <span class="text-xs text-gray-500">อัพเดตล่าสุด: วันนี้</span>
      </div>
    </n-card>

    <!-- Pending Orders Card -->
    <n-card class="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">รอดำเนินการ</p>
          <p class="text-2xl font-bold text-orange-600">
            {{ loading ? '---' : formatNumber(stats.pending) }}
          </p>
        </div>
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <div class="text-2xl">⏰</div>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <span class="text-xs text-orange-600">{{ pendingPercentage }}% ของทั้งหมด</span>
      </div>
    </n-card>

    <!-- Completed Orders Card -->
    <n-card class="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">สำเร็จแล้ว</p>
          <p class="text-2xl font-bold text-green-600">
            {{ loading ? '---' : formatNumber(stats.completed) }}
          </p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <div class="text-2xl">✅</div>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <span class="text-xs text-green-600">{{ completedPercentage }}% ของทั้งหมด</span>
      </div>
    </n-card>

    <!-- Cancelled Orders Card -->
    <n-card class="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">ยกเลิกแล้ว</p>
          <p class="text-2xl font-bold text-red-600">
            {{ loading ? '---' : formatNumber(stats.cancelled) }}
          </p>
        </div>
        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <div class="text-2xl">❌</div>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <span class="text-xs text-red-600">{{ cancelledPercentage }}% ของทั้งหมด</span>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard } from 'naive-ui'
import type { OrderStats } from '@/types/dashboard'

// Props
interface Props {
  stats: OrderStats
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// Computed
const pendingPercentage = computed(() => {
  if (props.stats.total === 0) return 0
  return Math.round((props.stats.pending / props.stats.total) * 100)
})

const completedPercentage = computed(() => {
  if (props.stats.total === 0) return 0
  return Math.round((props.stats.completed / props.stats.total) * 100)
})

const cancelledPercentage = computed(() => {
  if (props.stats.total === 0) return 0
  return Math.round((props.stats.cancelled / props.stats.total) * 100)
})

// Methods
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('th-TH').format(num)
}
</script>