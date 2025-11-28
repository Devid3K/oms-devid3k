# 🤖 AI PROFILE - Order Management System (OMS)
# ⚠️ IMPORTANT: READ THIS FIRST BEFORE GENERATING ANY CODE ⚠️

## Project Overview
- **Framework**: Vue 3 with TypeScript
- **Styling**: Tailwind CSS (primary)
- **UI Components**: Naive UI Components only
- **System Type**: Order Management System (OMS)
- **Main Pages**: Dashboard, Order Management

## Development Guidelines

### 1. Technology Stack
- **Frontend**: Vue 3 with Composition API
- **Styling**: Tailwind CSS classes for all styling
- **UI Library**: Naive UI components exclusively
- **TypeScript**: Use TypeScript for type safety
- **State Management**: Pinia stores (already configured)

### 2. Code Style Preferences
- Use Vue 3 Composition API (`<script setup>`)
- Prefer `const` over `let` when possible
- Use TypeScript interfaces for type definitions
- Follow camelCase for JavaScript/TypeScript
- Use kebab-case for component file names

### 3. Component Structure
```vue
<template>
  <!-- Use Naive UI components with Tailwind classes -->
  <div class="p-4 bg-gray-50">
    <n-card>
      <!-- Content here -->
    </n-card>
  </div>
</template>

<script setup lang="ts">
// Composition API imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// Naive UI imports
import { NCard, NButton, useMessage } from 'naive-ui'
// Store imports
import { useMainStore } from '@/stores/main'

// Types
interface OrderData {
  id: string
  status: string
  // ... other properties
}

// Reactive state
const orders = ref<OrderData[]>([])
const loading = ref(false)

// Computed properties
const activeOrders = computed(() => 
  orders.value.filter(order => order.status === 'active')
)

// Methods
const fetchOrders = async () => {
  loading.value = true
  try {
    // API call logic
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchOrders()
})
</script>
```

### 4. Styling Guidelines
- **Primary**: Use Tailwind CSS classes
- **Layout**: Use Tailwind flexbox and grid utilities
- **Spacing**: Use Tailwind spacing classes (p-4, m-2, etc.)
- **Colors**: Use Tailwind color palette
- **Responsive**: Use Tailwind responsive prefixes (sm:, md:, lg:)

### 5. Naive UI Component Usage
- Use Naive UI components for all interactive elements
- Common components: `n-button`, `n-input`, `n-table`, `n-card`, `n-modal`
- For forms: `n-form`, `n-form-item`, `n-input`, `n-select`
- For data display: `n-table`, `n-data-table`, `n-list`
- For notifications: `useMessage`, `useNotification`

### 6. File Organization
```
src/
├── views/
│   ├── dashboard/
│   │   ├── Dashboard.vue
│   │   └── components/
│   └── order-management/
│       ├── OrderList.vue
│       ├── OrderDetail.vue
│       └── components/
├── components/
│   └── common/
├── stores/
├── types/
└── composables/
```

### 7. State Management
- Use Pinia stores for global state
- Create separate stores for different domains (orders, dashboard, etc.)
- Use composables for reusable logic

### 8. API Integration
- Use the existing `apiService.ts` pattern
- Create typed interfaces for API responses
- Handle loading states and error handling consistently

### 9. Routing
- Use Vue Router for navigation
- Define routes in `/src/router/index.ts`
- Use typed route parameters

## Specific Instructions

### When generating Dashboard components:
- Focus on data visualization using Naive UI charts if needed
- Use cards for organizing different metrics
- Implement responsive design with Tailwind

### When generating Order Management components:
- Create list views with search and filter capabilities
- Implement CRUD operations for orders
- Use modals for detailed views and forms
- Include status management functionality

### Error Handling:
- Use Naive UI's message system for user feedback
- Implement proper loading states
- Handle API errors gracefully

### Testing:
- Write unit tests using Vitest (already configured)
- Use Cypress for E2E tests
- Test components in isolation

## Do NOT use:
- Custom CSS files (use Tailwind instead)
- Other UI libraries besides Naive UI
- jQuery or other DOM manipulation libraries
- Class-based Vue components (use Composition API)

## Always include:
- TypeScript types for all data structures
- Proper error handling
- Loading states for async operations
- Responsive design considerations
- Accessibility attributes where appropriate