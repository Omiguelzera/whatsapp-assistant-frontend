import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatMessage, Notification } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const notifications = ref<Notification[]>([])
  let ws: WebSocket | null = null

  function addMessage(content: string, sender: 'user' | 'assistant') {
    messages.value.push({
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date().toISOString(),
    })
  }

  function connectWebSocket() {
    if (ws) return
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
    ws = new WebSocket(`${protocol}://${window.location.host}/ws/notifications`)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.notifications) {
        notifications.value = data.notifications
      }
    }

    ws.onclose = () => {
      ws = null
      setTimeout(connectWebSocket, 3000)
    }
  }

  function disconnectWebSocket() {
    ws?.close()
    ws = null
  }

  function clearMessages() {
    messages.value = []
  }

  return { messages, notifications, addMessage, connectWebSocket, disconnectWebSocket, clearMessages }
})