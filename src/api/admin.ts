import apiClient from './client'
import type { AssistantMetrics } from '@/types'

export async function getMetrics(): Promise<AssistantMetrics> {
  const { data } = await apiClient.get<AssistantMetrics>('/assistant/admin/metrics')
  return data
}