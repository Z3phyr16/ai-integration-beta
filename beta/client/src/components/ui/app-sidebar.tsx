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
import { useLocation, useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

type AppSidebarProps = {
  conversationHook: ReturnType<typeof useConversation>
}

export function AppSidebar({ conversationHook }: AppSidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const typeSpeed = 25

  if (conversationHook.isLoading) {
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
            <Skeleton className="h-4 w-20" />
            <hr className="my-2" />
            <SidebarMenu className="mb-4">
              <SidebarMenuItem>
                <Skeleton className="h-8 w-full" />
              </SidebarMenuItem>
            </SidebarMenu>
            {conversationHook.conversations.length > 0 && (
              <>
                <Skeleton className="h-4 w-20" />
                <hr className="my-2" />
                <SidebarMenu>
                  {conversationHook.conversations.map((convo) => {
                    return <Skeleton className="h-8 w-full" key={convo.id} />
                  })}
                </SidebarMenu>
              </>
            )}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
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
    </Sidebar>
  )
}
