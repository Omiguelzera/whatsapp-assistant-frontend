import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listSessions, createSession } from '@/api/sessions'
import type { AssistantSession, AssistantSessionCreate } from '@/types'

export const useSessionsStore = defineStore('sessions', () => {
  const sessions = ref<AssistantSession[]>([])
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    try {
      sessions.value = await listSessions()
    } finally {
      loading.value = false
    }
  }

  async function create(payload: AssistantSessionCreate) {
    const session = await createSession(payload)
    sessions.value.unshift(session)
    return session
  }

  return { sessions, loading, fetch, create }
})