import axios from 'axios'
import type { TokenResponse } from '@/types'

export async function login(email: string, password: string): Promise<TokenResponse> {
  const params = new URLSearchParams()
  params.append('username', email)
  params.append('password', password)
  const { data } = await axios.post<TokenResponse>('/api/v1/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data
}