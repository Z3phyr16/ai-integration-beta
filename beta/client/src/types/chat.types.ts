export interface Message {
  id: number
  conversationId: number
  role: "USER" | "ASSISTANT"
  content: string
  contentType?: string
  imagePath?: string | null
  createdAt: string
}

export interface SendMessageRequest {
  content: string
  image?: File | null
}

export interface SendMessageResponse {
  content: string
  contentType: string
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
