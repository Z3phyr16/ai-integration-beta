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

export function AppSidebar() {
  const typeSpeed = 25
  const { isLoading, conversations } = useConversation()
  if (isLoading) {
    return (
      <div>
        <p>yawts is loading</p>
      </div>
    )
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>YAWTS</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarMenu>
            {conversations.map((convo) => (
              <SidebarMenuItem key={convo.id}>
                <SidebarMenuButton>
                  <a href={`/c/${convo.id}`} className="w-100">
                    <TypingAnimation typeSpeed={typeSpeed}>
                      {convo.title}
                    </TypingAnimation>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
