import axios from "axios"
import type {
  ConversationResponse,
  Conversation,
  SendMessageRequest,
  SendMessageResponse,
} from "../types/chat.types"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const chatApi = {
  getConversations: async (): Promise<Conversation[]> => {
    const response = await api.get<Conversation[]>(`/api/chat/conversations/`)
    return response.data
  },

  getMessages: async (
    conversationId: number
  ): Promise<ConversationResponse> => {
    const response = await api.get<ConversationResponse>(
      `/api/chat/conversations/${conversationId}/messages`
    )
    return response.data
  },

  sendMessage: async (
    conversationId: number,
    data: SendMessageRequest
  ): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>(
      `/api/chat/conversations/${conversationId}/messages`,
      data
    )

    return response.data
  },
}
