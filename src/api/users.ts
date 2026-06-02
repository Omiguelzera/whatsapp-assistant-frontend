import apiClient from './client'
import type { User, PaginatedResponse } from '@/types'

export async function listUsers(page = 1, size = 20, globalFilter?: string): Promise<PaginatedResponse<User>> {
  const { data } = await apiClient.post<PaginatedResponse<User>>(
    `/users/lazy/?page=${page}&size=${size}${globalFilter ? `&global_filter=${globalFilter}` : ''}`,
    null
  )
  return data
}

export async function createUser(payload: { name: string; email: string; password: string }): Promise<User> {
  const { data } = await apiClient.post<User>('/users/', { ...payload, roles: [], is_active: true })
  return data
}