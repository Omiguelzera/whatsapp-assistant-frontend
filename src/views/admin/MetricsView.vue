<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-foreground">Métricas do Assistente</h2>
      <p class="text-muted-foreground text-sm">Painel de monitoramento do assistente WhatsApp</p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <Loader2 class="w-6 h-6 animate-spin text-muted-foreground" />
    </div>

    <div v-else-if="metrics" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card class="p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="font-medium text-foreground">Status do Sistema</p>
            <p class="text-xs text-muted-foreground">Estado atual do assistente</p>
          </div>
        </div>
        <Badge :variant="metrics.status === 'ok' ? 'success' : 'destructive'" class="text-sm px-3 py-1">
          {{ metrics.status.toUpperCase() }}
        </Badge>
      </Card>

      <Card class="p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Info class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="font-medium text-foreground">Informações</p>
            <p class="text-xs text-muted-foreground">Detalhes do painel</p>
          </div>
        </div>
        <p class="text-sm text-muted-foreground">{{ metrics.message }}</p>
      </Card>

      <Card class="p-5 md:col-span-2">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <BarChart3 class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p class="font-medium text-foreground">Métricas Avançadas</p>
            <p class="text-xs text-muted-foreground">Fallback, cobertura e auditoria</p>
          </div>
        </div>
        <div class="bg-muted/50 rounded-lg p-4 text-center text-muted-foreground text-sm">
          <Bot class="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p>Aguardando integração com IA para métricas detalhadas</p>
        </div>
      </Card>
    </div>

    <div v-else class="text-center py-12 text-muted-foreground">
      <p>Erro ao carregar métricas</p>
      <Button variant="link" @click="fetchMetrics">Tentar novamente</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMetrics } from '@/api/admin'
import type { AssistantMetrics } from '@/types'
import { CheckCircle, Info, BarChart3, Loader2, Bot } from 'lucide-vue-next'
import Card from '@/components/ui/card.vue'
import Badge from '@/components/ui/badge.vue'
import Button from '@/components/ui/button.vue'

const metrics = ref<AssistantMetrics | null>(null)
const loading = ref(false)

async function fetchMetrics() {
  loading.value = true
  try {
    metrics.value = await getMetrics()
  } finally {
    loading.value = false
  }
}

onMounted(fetchMetrics)
</script>