<template>
  <div class="flex flex-col h-[calc(100vh-8rem)] bg-card border border-border rounded-xl overflow-hidden">
    <div class="px-4 py-3 border-b border-border flex items-center gap-3">
      <RouterLink to="/sessions" class="text-muted-foreground hover:text-foreground">
        <ArrowLeft class="w-5 h-5" />
      </RouterLink>
      <Avatar fallback="#" class="w-9 h-9 bg-primary/10">
        <MessageSquare class="w-5 h-5 text-primary" />
      </Avatar>
      <div>
        <p class="font-medium text-foreground text-sm">Sessão #{{ sessionId }}</p>
        <p class="text-xs text-muted-foreground flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Conectado
        </p>
      </div>
    </div>

    <div ref="messagesEl" class="flex-1 overflow-y-auto p-4 space-y-1 bg-muted/10">
      <div v-if="chatStore.messages.length === 0" class="flex items-center justify-center h-full">
        <div class="text-center text-muted-foreground">
          <Bot class="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p class="text-sm">Inicie uma conversa com o assistente</p>
          <p class="text-xs mt-1 opacity-60">Integração IA em breve</p>
        </div>
      </div>
      <MessageBubble v-for="msg in chatStore.messages" :key="msg.id" :message="msg" />
    </div>

    <ChatInput @send="handleSend" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import MessageBubble from '@/components/chat/MessageBubble.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import Avatar from '@/components/ui/avatar.vue'
import { ArrowLeft, MessageSquare, Bot } from 'lucide-vue-next'

const route = useRoute()
const chatStore = useChatStore()
const sessionId = route.params.id as string
const messagesEl = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  })
}

watch(() => chatStore.messages.length, scrollToBottom)

async function handleSend(text: string) {
  chatStore.addMessage(text, 'user')
  // TODO: Integrar com API de IA quando disponível
  setTimeout(() => {
    chatStore.addMessage('🤖 Integração com IA em desenvolvimento. Sua mensagem foi recebida!', 'assistant')
  }, 800)
}

onMounted(() => {
  chatStore.clearMessages()
  chatStore.connectWebSocket()
  scrollToBottom()
})

onUnmounted(() => chatStore.disconnectWebSocket())
</script>