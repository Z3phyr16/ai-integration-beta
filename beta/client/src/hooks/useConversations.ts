import { chatApi } from "@/api/chat.api"
import type { Conversation } from "@/types/chat.types"
import { useEffect, useState } from "react"

export const useConversation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])

  const loadConversations = async () => {
    setIsLoading(false)
    const data = await chatApi.getConversations()
    setConversations(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadConversations()
  }, [])

  return {
    isLoading,
    conversations,
    reload: loadConversations,
  }
}
