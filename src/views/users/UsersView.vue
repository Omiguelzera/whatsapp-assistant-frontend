<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-foreground">Usuários</h2>
        <p class="text-muted-foreground text-sm">Gerencie os usuários do sistema</p>
      </div>
      <Button @click="openModal = true">
        <Plus class="w-4 h-4" />
        Novo Usuário
      </Button>
    </div>

    <div class="relative">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input v-model="search" @input="debouncedFetch" placeholder="Buscar usuários..." class="pl-9" />
    </div>

    <Card>
      <div v-if="loading" class="flex justify-center py-12">
        <Loader2 class="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
      <table v-else class="w-full text-sm">
        <thead class="bg-muted/50 border-b border-border">
          <tr>
            <th class="text-left px-4 py-3 font-medium text-muted-foreground">Nome</th>
            <th class="text-left px-4 py-3 font-medium text-muted-foreground">E-mail</th>
            <th class="text-left px-4 py-3 font-medium text-muted-foreground">Roles</th>
            <th class="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="4" class="text-center py-8 text-muted-foreground">Nenhum usuário encontrado</td>
          </tr>
          <tr
            v-for="user in users"
            :key="user.uuid"
            class="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <Avatar :fallback="user.name.charAt(0).toUpperCase()" class="w-7 h-7 text-xs" />
                {{ user.name }}
              </div>
            </td>
            <td class="px-4 py-3 text-muted-foreground">{{ user.email }}</td>
            <td class="px-4 py-3">
              <div class="flex flex-wrap gap-1">
                <Badge v-for="role in user.roles" :key="role.uuid" variant="secondary">{{ role.name }}</Badge>
                <span v-if="!user.roles?.length" class="text-muted-foreground text-xs">—</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <Badge :variant="user.is_active ? 'success' : 'secondary'">
                {{ user.is_active ? 'Ativo' : 'Inativo' }}
              </Badge>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="px-4 py-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <span>{{ total }} usuários no total</span>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" :disabled="page <= 1" @click="changePage(page - 1)">Anterior</Button>
          <span>Página {{ page }}</span>
          <Button variant="outline" size="sm" :disabled="users.length < pageSize" @click="changePage(page + 1)">Próxima</Button>
        </div>
      </div>
    </Card>

    <Dialog :open="openModal" @close="openModal = false">
      <DialogHeader>
        <DialogTitle>Novo Usuário</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <form @submit.prevent="handleCreate" class="space-y-4">
          <div class="space-y-1">
            <Label for="name">Nome</Label>
            <Input id="name" v-model="newUser.name" required />
          </div>
          <div class="space-y-1">
            <Label for="email">E-mail</Label>
            <Input id="email" v-model="newUser.email" type="email" required />
          </div>
          <div class="space-y-1">
            <Label for="password">Senha</Label>
            <Input id="password" v-model="newUser.password" type="password" required minlength="6" />
          </div>
          <Alert v-if="createError" variant="destructive">{{ createError }}</Alert>
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
import { listUsers, createUser } from '@/api/users'
import type { User } from '@/types'
import { Plus, Search, Loader2 } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Card from '@/components/ui/card.vue'
import Badge from '@/components/ui/badge.vue'
import Avatar from '@/components/ui/avatar.vue'
import Alert from '@/components/ui/alert.vue'
import Dialog from '@/components/ui/dialog.vue'
import DialogHeader from '@/components/ui/dialog-header.vue'
import DialogTitle from '@/components/ui/dialog-title.vue'
import DialogContent from '@/components/ui/dialog-content.vue'
import DialogFooter from '@/components/ui/dialog-footer.vue'

const users = ref<User[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = 20
const search = ref('')
const loading = ref(false)
const openModal = ref(false)
const creating = ref(false)
const createError = ref('')
const newUser = ref({ name: '', email: '', password: '' })

let debounceTimer: ReturnType<typeof setTimeout>
function debouncedFetch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { page.value = 1; fetchUsers() }, 400)
}

async function fetchUsers() {
  loading.value = true
  try {
    const res = await listUsers(page.value, pageSize, search.value || undefined)
    users.value = res.items
    total.value = res.total
  } catch {
    users.value = []
  } finally {
    loading.value = false
  }
}

function changePage(p: number) {
  page.value = p
  fetchUsers()
}

async function handleCreate() {
  creating.value = true
  createError.value = ''
  try {
    await createUser(newUser.value)
    openModal.value = false
    newUser.value = { name: '', email: '', password: '' }
    fetchUsers()
  } catch (e: any) {
    createError.value = e?.response?.data?.detail ?? 'Erro ao criar usuário'
  } finally {
    creating.value = false
  }
}

onMounted(fetchUsers)
</script>