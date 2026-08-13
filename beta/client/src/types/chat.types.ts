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

export interface Conversation {
  id: number
  title?: string
  createdAt: string
}

export interface ConversationResponse {
  title: string
  messages: Message[]
}
