export interface Role {
  uuid: string
  name: string
}

export interface User {
  uuid: string
  name: string
  email: string
  is_active: boolean
  roles: Role[]
}

export interface TokenResponse {
  access_token: string
  token_type: string
  user: User
}

export interface AssistantSession {
  id: number
  user_id: number
  channel: string
  status: string
  started_at: string
  ended_at: string | null
}

export interface AssistantSessionCreate {
  user_id: number
  channel: 'whatsapp'
}

export interface AssistantMetrics {
  status: string
  message: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
}

export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: string
}

export interface Notification {
  id: string
  message: string
  read: boolean
  created_at: string
}