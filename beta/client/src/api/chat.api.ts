import axios from "axios"
import type {
  ConversationResponse,
  Conversation,
  ResponseType,
  SendMessageRequest,
  SendMessageResponse,
} from "../types/chat.types"
const currentHost = window.location.hostname
const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || `http://${currentHost}:3000/`,
  baseURL: `http://${currentHost}:3000/`,
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
    const formData = new FormData()
    formData.append("content", data.content)
    if (data.image) {
      formData.append("image", data.image)
    }
    const response = await api.post<SendMessageResponse>(
      `/api/chat/conversations/${conversationId}/messages`,
      formData
    )
    console.log(response)
    return response.data
  },

  createConversation: async (title: string): Promise<ResponseType> => {
    const response = await api.post<ResponseType>(`/api/chat/conversations`, {
      title,
    })
    return response.data
  },

  renameConversation: async (
    conversation: Conversation
  ): Promise<ResponseType> => {
    const response = await api.patch<ResponseType>(
      `/api/chat/conversations/${conversation.id}`,
      {
        title: conversation.title,
      }
    )
    return response.data
  },

  deleteConversation: async (conversationId: number): Promise<ResponseType> => {
    const response = await api.delete<ResponseType>(
      `/api/chat/conversations/${conversationId}`
    )
    return response.data
  },
}
