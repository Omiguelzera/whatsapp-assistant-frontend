<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-foreground">Sessões do Assistente</h2>
        <p class="text-muted-foreground text-sm">Gerencie as conversas do assistente WhatsApp</p>
      </div>
      <Button @click="openModal = true">
        <Plus class="w-4 h-4" />
        Nova Sessão
      </Button>
    </div>

    <div v-if="sessionsStore.loading" class="flex justify-center py-12">
      <Loader2 class="w-6 h-6 animate-spin text-muted-foreground" />
    </div>

    <div v-else-if="sessionsStore.sessions.length === 0" class="text-center py-12 text-muted-foreground">
      <MessageSquare class="w-12 h-12 mx-auto mb-3 opacity-30" />
      <p>Nenhuma sessão encontrada</p>
    </div>

    <div v-else class="grid gap-3">
      <RouterLink
        v-for="session in sessionsStore.sessions"
        :key="session.id"
        :to="`/chat/${session.id}`"
        class="block"
      >
        <Card class="p-4 hover:bg-accent/50 transition-colors cursor-pointer group">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <Avatar fallback="#" class="bg-primary/10">
                <MessageSquare class="w-5 h-5 text-primary" />
              </Avatar>
              <div>
                <p class="font-medium text-foreground">Sessão #{{ session.id }}</p>
                <p class="text-sm text-muted-foreground">User {{ session.user_id }} · {{ session.channel }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Badge :variant="session.status === 'open' ? 'success' : 'secondary'">
                {{ session.status === 'open' ? 'Aberta' : 'Fechada' }}
              </Badge>
              <span class="text-xs text-muted-foreground">{{ formatDate(session.started_at) }}</span>
              <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </Card>
      </RouterLink>
    </div>

    <Dialog :open="openModal" @close="openModal = false">
      <DialogHeader>
        <DialogTitle>Nova Sessão</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <form @submit.prevent="handleCreate" class="space-y-4">
          <div class="space-y-1">
            <Label for="userId">User ID</Label>
            <Input id="userId" v-model.number="newSession.user_id" type="number" min="1" required />
          </div>
        </form>
      </DialogContent>
      <DialogFooter>
        <Button variant="outline" type="button" @click="openModal = false">Cancelar</Button>
        <Button :disabled="creating" @click="handleCreate">
          <Loader2 v-if="creating" class="w-4 h-4 animate-spin" />
          {{ creating ? 'Criando...' : 'Criar' }}
        </Button>
      </DialogFooter>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionsStore } from '@/stores/sessions'
import { MessageSquare, Plus, ChevronRight, Loader2 } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card.vue'
import Badge from '@/components/ui/badge.vue'
import Avatar from '@/components/ui/avatar.vue'
import Dialog from '@/components/ui/dialog.vue'
import DialogHeader from '@/components/ui/dialog-header.vue'
import DialogTitle from '@/components/ui/dialog-title.vue'
import DialogContent from '@/components/ui/dialog-content.vue'
import DialogFooter from '@/components/ui/dialog-footer.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'

const sessionsStore = useSessionsStore()
const router = useRouter()

const openModal = ref(false)
const creating = ref(false)
const newSession = ref({ user_id: 1, channel: 'whatsapp' as const })

onMounted(() => sessionsStore.fetch())

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

async function handleCreate() {
  creating.value = true
  try {
    const session = await sessionsStore.create(newSession.value)
    openModal.value = false
    router.push(`/chat/${session.id}`)
  } finally {
    creating.value = false
  }
}
</script>