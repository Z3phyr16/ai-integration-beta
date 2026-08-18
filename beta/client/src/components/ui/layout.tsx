import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "./sidebar"
import type { Conversation } from "../../types/chat.types"
import ConversationModal from "./conversation-modal"
import { useState } from "react"
import { ConversationProvider } from "./conversation-provider"
import { useConversationContext } from "./conversation-provider"

import { AppSidebar } from "./app-sidebar"

export default function Layout() {
  return (
    <ConversationProvider>
      <LayoutContent />
    </ConversationProvider>
  )
}

function LayoutContent() {
  const conversationHook = useConversationContext()
  const [open, setOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({
      id: 0,
      title: "",
      createdAt: "",
    })
  return (
    <SidebarProvider>
      <AppSidebar conversationHook={conversationHook} />
      <SidebarTrigger />

      <main className="w-full p-4">
        <Outlet />
      </main>
      <ConversationModal
        open={open}
        onOpenChange={setOpen}
        conversation={selectedConversation}
        addConversation={conversationHook.addConversation}
        reload={conversationHook.reload}
      />
    </SidebarProvider>
  )
}
