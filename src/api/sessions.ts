import apiClient from './client'
import type { AssistantSession, AssistantSessionCreate } from '@/types'

export async function listSessions(): Promise<AssistantSession[]> {
  const { data } = await apiClient.get<AssistantSession[]>('/assistant/sessions/')
  return data
}

export async function createSession(payload: AssistantSessionCreate): Promise<AssistantSession> {
  const { data } = await apiClient.post<AssistantSession>('/assistant/sessions/', payload)
  return data
}