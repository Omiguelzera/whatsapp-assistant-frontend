<template>
  <header class="h-14 border-b border-border bg-card flex items-center px-6 justify-between">
    <h1 class="font-semibold text-foreground">{{ pageTitle }}</h1>
    <div class="flex items-center gap-3">
      <div class="relative">
        <Bell class="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        <span
          v-if="chat.notifications.length > 0"
          class="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-destructive-foreground text-xs flex items-center justify-center"
        >
          {{ chat.notifications.length }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
          <span class="text-primary-foreground text-xs font-semibold">
            {{ auth.user?.name?.charAt(0)?.toUpperCase() ?? 'U' }}
          </span>
        </div>
        <span class="text-sm font-medium">{{ auth.user?.name ?? 'Usuário' }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import { Bell } from 'lucide-vue-next'

const route = useRoute()
const auth = useAuthStore()
const chat = useChatStore()

const titles: Record<string, string> = {
  sessions: 'Sessões do Assistente',
  chat: 'Chat',
  users: 'Usuários',
  metrics: 'Métricas',
}

const pageTitle = computed(() => titles[route.name as string] ?? 'Dashboard')
</script>