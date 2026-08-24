export interface Message {
  id: number
  conversationId: number
  role: "USER" | "ASSISTANT"
  content: string
  createdAt: string
}

export interface SendMessageRequest {
  content: string
}

export interface SendMessageResponse {
  response: string
}

export interface ResponseType {
  success: boolean
  message: string
  data: any
}

export interface Conversation {
  id: number
  title?: string
  createdAt: string
}

export interface ConversationResponse {
  conversation: Conversation
  messages: Message[]
}
