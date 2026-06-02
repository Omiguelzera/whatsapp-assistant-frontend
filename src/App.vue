<template>
  <div class="min-h-screen bg-background">
    <template v-if="auth.isAuthenticated">
      <AppSidebar />
      <div class="ml-64 flex flex-col min-h-screen">
        <AppHeader />
        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

const auth = useAuthStore()
</script>