import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Trash, EllipsisVertical, Pencil } from "lucide-react"
import { TypingAnimation } from "./typing-animation"
import type { Conversation } from "@/types/chat.types"

type ConversationListProps = {
  conversations: Conversation[]
  onRename: (conversation: Conversation) => void
  onDelete: (Conversation: Conversation) => void
  typeSpeed?: number
}

const ConversationItem = React.memo(function ConversationItem({
  conversation,
  onRename,
  onDelete,
  typeSpeed,
}: {
  conversation: Conversation
  onRename: (conversation: Conversation) => void
  onDelete: (conversation: Conversation) => void
  typeSpeed: number
}) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = location.pathname === `/c/${conversation.id}`

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        onClick={() => navigate(`/c/${conversation.id}`)}
        className="group flex cursor-pointer items-center justify-between"
      >
        <TypingAnimation
          typeSpeed={typeSpeed}
          className="min-w-0 flex-1 truncate"
        >
          {conversation.title}
        </TypingAnimation>
      </SidebarMenuButton>

      <SidebarMenuAction showOnHover>
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical className="h-4 w-4" />
          </PopoverTrigger>

          <PopoverContent align="center" side="right" className="w-48 p-2">
            <PopoverHeader className="gap-2">
              <PopoverTitle
                className="flex cursor-pointer items-center gap-2"
                onClick={() => onRename(conversation)}
              >
                <Pencil className="h-4 w-9" />
                <span className="w-100">Rename</span>
              </PopoverTitle>
              <PopoverTitle
                className="flex cursor-pointer items-center gap-2"
                onClick={() => onDelete(conversation)}
              >
                <Trash className="h-4 w-9 text-red-500" />
                <span className="w-100 text-red-500">Delete</span>
              </PopoverTitle>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </SidebarMenuAction>
    </SidebarMenuItem>
  )
})

export const ConversationList = React.memo(function ConversationList({
  conversations,
  onRename,
  onDelete,
  typeSpeed = 25,
}: ConversationListProps) {
  return (
    <SidebarMenu>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          onRename={onRename}
          onDelete={onDelete}
          typeSpeed={typeSpeed}
        />
      ))}
    </SidebarMenu>
  )
})
