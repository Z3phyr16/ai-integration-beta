import { createContext, useContext } from "react"
import { useConversation } from "@/hooks/useConversations"

type ConversationContextType = ReturnType<typeof useConversation>

const ConversationContext = createContext<ConversationContextType | null>(null)

export function ConversationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const conversationHook = useConversation()

  return (
    <ConversationContext.Provider value={conversationHook}>
      {children}
    </ConversationContext.Provider>
  )
}

export function useConversationContext() {
  const context = useContext(ConversationContext)

  if (!context) {
    throw new Error(
      "useConversationContext must be used inside ConversationProvider"
    )
  }

  return context
}
