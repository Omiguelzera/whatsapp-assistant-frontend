<template>
  <aside class="fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col">
    <div class="p-6 border-b border-border">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span class="text-primary-foreground text-sm font-bold">W</span>
        </div>
        <span class="font-semibold text-foreground">WA Assistant</span>
      </div>
    </div>

    <nav class="flex-1 p-4 space-y-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        :class="{ 'bg-accent text-accent-foreground font-medium': isActive(item.to) }"
      >
        <component :is="item.icon" class="w-4 h-4" />
        {{ item.label }}
      </RouterLink>
    </nav>

    <Separator />
    <div class="p-4">
      <div class="flex items-center gap-2 mb-3">
        <Avatar :fallback="auth.user?.name?.charAt(0)?.toUpperCase() ?? 'U'" class="w-8 h-8 text-xs" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ auth.user?.name ?? 'Usuário' }}</p>
          <p class="text-xs text-muted-foreground truncate">{{ auth.user?.email }}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" class="w-full justify-start text-destructive hover:text-destructive" @click="handleLogout">
        <LogOut class="w-4 h-4" />
        Sair
      </Button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { MessageSquare, Users, BarChart3, LogOut } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Avatar from '@/components/ui/avatar.vue'
import Separator from '@/components/ui/separator.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const navItems = [
  { to: '/sessions', label: 'Sessões', icon: MessageSquare },
  { to: '/users', label: 'Usuários', icon: Users },
  { to: '/admin/metrics', label: 'Métricas', icon: BarChart3 },
]

function isActive(path: string) {
  return route.path.startsWith(path)
}

async function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>