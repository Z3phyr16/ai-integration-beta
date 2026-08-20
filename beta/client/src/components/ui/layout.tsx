import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "./sidebar"
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
  return (
    <SidebarProvider>
      <AppSidebar conversationHook={conversationHook} />
      <SidebarTrigger />

      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
