import { useEffect, useState } from "react"
import { chatApi } from "../api/chat.api"
import type { Message } from "../types/chat.types"
import { useNavigate } from "react-router-dom"

export const useChat = (conversationId: number) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [title, setTitle] = useState("No  Title")
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  const loadMessages = async () => {
    try {
      const data = await chatApi.getMessages(conversationId)
      if (!data.conversation) {
        navigate("/c")
        return
      }
      setTitle(data.conversation.title || "No  Title")
      setMessages(data.messages)
    } catch (error) {
      console.error(error)
    }
  }

  const sendMessage = async (
    content: string,
    targetConversationId?: number
  ) => {
    try {
      setLoadingChat(true)
      const id = targetConversationId ?? conversationId
      const tempUserMessage: Message = {
        id: Date.now(),
        conversationId,
        role: "USER",
        content,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, tempUserMessage])

      const response = await chatApi.sendMessage(id, {
        content,
      })

      const aiMessage: Message = {
        id: Date.now() + 1,
        conversationId,
        role: "ASSISTANT",
        content: response.response,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])

      return response
    } finally {
      setLoadingChat(false)
    }
  }

  useEffect(() => {
    if (!conversationId) return

    loadMessages()
  }, [conversationId])

  return {
    title,
    messages,
    loading,
    loadingChat,
    setLoading,
    sendMessage,
    reload: loadMessages,
  }
}
