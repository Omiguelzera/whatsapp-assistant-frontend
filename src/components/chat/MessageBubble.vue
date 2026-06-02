<template>
  <div
    class="flex mb-3"
    :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
  >
    <div
      class="max-w-[70%] px-4 py-2 rounded-2xl text-sm"
      :class="
        message.sender === 'user'
          ? 'bg-primary text-primary-foreground rounded-br-sm'
          : 'bg-muted text-foreground rounded-bl-sm'
      "
    >
      <p>{{ message.content }}</p>
      <span class="text-xs opacity-60 mt-1 block text-right">
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/types'

defineProps<{ message: ChatMessage }>()

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
</script>