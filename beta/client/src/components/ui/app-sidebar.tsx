import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useConversation } from "@/hooks/useConversations"
import { TypingAnimation } from "./typing-animation"
import { useNavigate } from "react-router-dom"
import ConversationModal from "./conversation-modal"
import type { Conversation } from "@/types/chat.types"
import { useState, useCallback } from "react"
import { ConversationList } from "./conversation-list"

type AppSidebarProps = {
  conversationHook: ReturnType<typeof useConversation>
}

export function AppSidebar({ conversationHook }: AppSidebarProps) {
  const navigate = useNavigate()
  const typeSpeed = 25
  const [selectedConvo, setSelectedConvo] = useState<Conversation>({
    id: 0,
    title: "",
    createdAt: "",
  })
  const [mode, setMode] = useState("rename")
  const [modalOpen, setModalOpen] = useState(false)
  const handleRenameClick = useCallback((convo: Conversation) => {
    setMode("rename")
    setSelectedConvo(convo)
    setModalOpen(true)
  }, [])
  const handleDeleteClick = useCallback((convo: Conversation) => {
    setMode("delete")
    setSelectedConvo(convo)
    setModalOpen(true)
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center">
            YAWTS
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <hr />
          <SidebarMenu className="mb-4">
            <SidebarMenuItem>
              <SidebarMenuButton
                className="cursor-pointer"
                onClick={() => navigate("/c")}
              >
                <TypingAnimation typeSpeed={typeSpeed}>
                  Create Conversation
                </TypingAnimation>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {conversationHook.conversations.length > 0 && (
            <>
              <SidebarGroupLabel>Conversations</SidebarGroupLabel>
              <hr />
              <ConversationList
                conversations={conversationHook.conversations}
                onDelete={handleDeleteClick}
                onRename={handleRenameClick}
                typeSpeed={typeSpeed}
              />
            </>
          )}
          {selectedConvo && (
            <ConversationModal
              open={modalOpen}
              onOpenChange={setModalOpen}
              mode={mode}
              conversation={selectedConvo}
              conversationHook={conversationHook}
            />
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
