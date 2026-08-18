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
import type { Conversation } from "../../types/chat.types"
import { useConversation } from "@/hooks/useConversations"
import { TypingAnimation } from "./typing-animation"
import { useState } from "react"
import ConversationModal from "./conversation-modal"
import { useLocation, useNavigate } from "react-router-dom"

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const typeSpeed = 25
  const conversationHook = useConversation()
  const [open, setOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({
      id: 0,
      title: "",
      createdAt: "",
    })

  if (conversationHook.isLoading) {
    return (
      <div>
        <p>Yawts is Loading...</p>
      </div>
    )
  }
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
                onClick={() => {
                  setSelectedConversation({
                    id: 0,
                    title: "",
                    createdAt: "",
                  })
                  setOpen(true)
                }}
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
              <SidebarMenu>
                {conversationHook.conversations.map((convo) => {
                  const isActive = location.pathname === `/c/${convo.id}`

                  return (
                    <SidebarMenuItem key={convo.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className="cursor-pointer"
                        onClick={() => navigate(`/c/${convo.id}`)}
                      >
                        <TypingAnimation typeSpeed={typeSpeed}>
                          {convo.title}
                        </TypingAnimation>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <ConversationModal
        open={open}
        onOpenChange={setOpen}
        conversation={selectedConversation}
        addConversation={conversationHook.addConversation}
        reload={conversationHook.reload}
      />
    </Sidebar>
  )
}
