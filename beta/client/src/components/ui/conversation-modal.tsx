import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./button"
import { Input } from "./input"
import type { Conversation } from "@/types/chat.types"
import { useEffect, useState } from "react"
import { useConversation } from "@/hooks/useConversations"

type ConversationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  conversation: Conversation
  conversationHook: ReturnType<typeof useConversation>
}
export default function ConversationModal({
  open,
  onOpenChange,
  conversation,
  conversationHook,
}: ConversationModalProps) {
  const [convo, setConvo] = useState<Conversation>({
    id: 0,
    title: "",
    createdAt: "",
  })
  useEffect(() => {
    if (conversation.id > 0) {
      setConvo(conversation)
    } else {
      setConvo({
        id: 0,
        title: "",
        createdAt: "",
      })
    }
  }, [conversation, open])

  const handleSubmit = async () => {
    if (!convo.title) return
    const response = await conversationHook.renameConvo(convo)
    if (response.success) {
      console.log(response.message)
      onOpenChange(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Conversation</DialogTitle>
          <DialogDescription>
            Rename your legendary conversation with yawts!
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Input
            value={convo.title ?? ""}
            onChange={(e) =>
              setConvo((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Enter Conversation Title"
          />
        </form>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  )
}
