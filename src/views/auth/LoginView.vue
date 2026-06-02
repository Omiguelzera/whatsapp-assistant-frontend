<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/30">
    <div class="w-full max-w-md px-4">
      <Card>
        <CardHeader class="text-center">
          <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare class="w-7 h-7 text-primary-foreground" />
          </div>
          <CardTitle class="text-2xl">WhatsApp Assistant</CardTitle>
          <CardDescription>Entre para acessar o painel</CardDescription>
        </CardHeader>

        <CardContent>
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-1">
              <Label for="email">E-mail</Label>
              <Input id="email" v-model="form.email" type="email" placeholder="seu@email.com" required />
            </div>

            <div class="space-y-1">
              <Label for="password">Senha</Label>
              <div class="relative">
                <Input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                  class="pr-10"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Eye v-if="!showPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <Alert v-if="error" variant="destructive">
              {{ error }}
            </Alert>

            <Button type="submit" class="w-full" :disabled="loading">
              <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { MessageSquare, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import Card from '@/components/ui/card.vue'
import CardHeader from '@/components/ui/card-header.vue'
import CardTitle from '@/components/ui/card-title.vue'
import CardDescription from '@/components/ui/card-description.vue'
import CardContent from '@/components/ui/card-content.vue'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Alert from '@/components/ui/alert.vue'

const auth = useAuthStore()
const router = useRouter()

const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(form.value.email, form.value.password)
    router.push('/sessions')
  } catch (e: any) {
    error.value = e?.response?.data?.detail ?? 'Erro ao fazer login. Verifique suas credenciais.'
  } finally {
    loading.value = false
  }
}
</script>