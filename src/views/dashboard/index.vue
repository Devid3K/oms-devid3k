<template>
  <div class="min-h-screen bg-[#F9F8F6] p-4 md:p-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-gray-600">ภาพรวมระบบจัดการคำสั่งซื้อ</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <n-spin size="large" />
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-6">
      <!-- Statistics Cards -->
      <StatsCards :stats="dashboardStore.orderStats" :loading="dashboardStore.loading" />
      
      <!-- Charts and Recent Orders Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- Sales Chart -->
        <SalesChart :data="dashboardStore.salesData" :loading="dashboardStore.loading" />
        
        <!-- Recent Orders -->
        <RecentOrders :orders="dashboardStore.recentOrders" :loading="dashboardStore.loading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import StatsCards from './components/StatsCards.vue'
import SalesChart from './components/SalesChart.vue'
import RecentOrders from './components/RecentOrders.vue'
import { useDashboardStore } from '../../stores/dashboard'

// Store
const dashboardStore = useDashboardStore()

// Reactive state
const loading = ref(true)

// Methods
const fetchDashboardData = async () => {
  try {
    loading.value = true
    await dashboardStore.refreshDashboard()
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchDashboardData()
})
</script>
