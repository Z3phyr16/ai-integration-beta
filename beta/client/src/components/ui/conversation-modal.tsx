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
  mode: string
  conversation: Conversation
  conversationHook: ReturnType<typeof useConversation>
}
export default function ConversationModal({
  open,
  onOpenChange,
  mode = "rename",
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
    if (mode === "rename") {
      if (!convo.title) return
      const response = await conversationHook.renameConvo(convo)
      if (response.success) {
        console.log(response.message)
        onOpenChange(false)
      }
    } else {
      const response = await conversationHook.deleteConvo(convo.id)
      if (response.success) {
        console.log(response.message)
        onOpenChange(false)
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "rename" ? "Rename " : "Delete "}
            Conversation
          </DialogTitle>
          <DialogDescription>Bye bye conversation?</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          {mode === "rename" && (
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
          )}
          {mode === "delete" && (
            <h3 className="text-center text-lg">
              Are you sure you want to delete your legendary conversation with
              Yawts?
            </h3>
          )}
          <div
            className={`mt-4 flex items-center ${mode === "rename" ? "justify-end" : "justify-center"} gap-2`}
          >
            {mode === "delete" && (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  setConvo({
                    id: 0,
                    title: "",
                    createdAt: "",
                  })
                  onOpenChange(false)
                }}
              >
                Cancel
              </Button>
            )}
            <Button className="cursor-pointer" onClick={handleSubmit}>
              {mode === "rename" ? "Save Changes" : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
