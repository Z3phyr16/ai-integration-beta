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
import { toast } from "@/components/ui/toast"
import type { ResponseType } from "@/types/chat.types"
import { useNavigate } from "react-router-dom"

type ConversationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  conversation: Conversation
  addConversation: (title: string) => Promise<ResponseType>
  reload: () => Promise<void>
}
export default function ConversationModal({
  open,
  onOpenChange,
  conversation,
  addConversation,
  reload,
}: ConversationModalProps) {
  const [convo, setConvo] = useState<Conversation>({
    id: 0,
    title: "",
    createdAt: "",
  })
  const navigate = useNavigate()
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
    if (!convo?.title?.trim()) {
      return
    }
    const response = await addConversation(convo.title!)
    if (response.success) {
      await reload()
      onOpenChange(false)
      navigate(`/c/${response.data.id}`)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {convo.id === 0 ? "Create Conversation" : "Rename Conversation"}
          </DialogTitle>

          <DialogDescription>
            {convo.id === 0
              ? "Create a new conversation."
              : "Update the conversation title."}
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
        <Button onClick={handleSubmit}>
          {convo.id === 0 ? "Create" : "Save Changes"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
