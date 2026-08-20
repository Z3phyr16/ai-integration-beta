import { chatApi } from "@/api/chat.api"
import type { Conversation } from "@/types/chat.types"
import { useEffect, useState } from "react"

export const useConversation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])

  const loadConversations = async () => {
    try {
      setIsLoading(true)
      const data = await chatApi.getConversations()
      setConversations(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const addConversation = async (title: string) => {
    try {
      setIsLoading(true)

      const response = await chatApi.createConversation(title)

      if (response.success) {
        setConversations((prev) => [response.data, ...prev])
      }

      return response
    } finally {
      setIsLoading(false)
    }
  }

  const renameConvo = async (conversation: Conversation) => {
    try {
      setIsLoading(true)
      const response = await chatApi.renameConversation(conversation)

      if (response.success) {
        setConversations((prevList) =>
          prevList.map((convo) =>
            convo.id === conversation.id
              ? { ...convo, title: response.data.title }
              : convo
          )
        )
      }
      return response
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadConversations()
  }, [])

  return {
    isLoading,
    conversations,
    addConversation,
    renameConvo,
    reload: loadConversations,
  }
}
