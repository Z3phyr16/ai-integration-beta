import { useChat } from "@/hooks/useChat"
import { useParams } from "react-router-dom"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import ReactMarkdown from "react-markdown"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { ArrowUpIcon } from "lucide-react"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { useState } from "react"
import { MessageList } from "@/components/ui/message-list"
import type { Conversation } from "@/types/chat.types"
import ConversationModal from "@/components/ui/conversation-modal"
import { useConversation } from "@/hooks/useConversations"
const ChatPage = () => {
  const { conversationId } = useParams()
  const { title, loadingChat, loading, messages, sendMessage } = useChat(
    Number(conversationId) || 0
  )

  const conversationHook = useConversation()
  const [open, setOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({
      id: 0,
      title: "",
      createdAt: "",
    })

  const [message, setMessage] = useState("")
  const handleSend = async () => {
    const trimmed = message.trim()

    if (!trimmed) return
    setMessage("")

    await sendMessage(trimmed)
  }
  if (!conversationId) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>YAWTS</EmptyTitle>
            <EmptyDescription>
              Create conversation by clicking the button below
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button
              onClick={() => {
                setSelectedConversation({
                  id: 0,
                  title: "",
                  createdAt: "",
                })
                setOpen(true)
              }}
            >
              Create Conversation
            </Button>
          </EmptyContent>
        </Empty>

        <ConversationModal
          open={open}
          onOpenChange={setOpen}
          conversation={selectedConversation}
          addConversation={conversationHook.addConversation}
          reload={conversationHook.reload}
        />
      </div>
    )
  }
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Loading Conversation...</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    )
  }
  if (messages.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <Empty className="pb-2">
            <EmptyHeader>
              <EmptyTitle>YAWTS</EmptyTitle>
              <EmptyDescription>
                Start your legendary convo today
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <Marker variant="separator" className="mt-4">
            <MarkerContent>
              Nagkakamali si Yawts ah hinay hinay lang
            </MarkerContent>
          </Marker>
          <div className="w-full py-4">
            <div className="rounded-xl border bg-background shadow-lg">
              <InputGroup>
                <InputGroupTextarea
                  placeholder="Send a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupButton
                    className="ml-auto"
                    variant="default"
                    onClick={handleSend}
                  >
                    <ArrowUpIcon />
                    <span className="sr-only">Send</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col">
        {/* <h1 className="text-[24px]">{title}</h1> */}
        <div className="flex-1 overflow-y-auto py-12">
          <div className="flex flex-col gap-12">
            <MessageList messages={messages} />

            <Bubble
              className={loadingChat ? "" : "hidden"}
              variant="muted"
              align="start"
            >
              <BubbleContent className="flex items-center gap-2">
                <Spinner />
                <ReactMarkdown>Thinking...</ReactMarkdown>
              </BubbleContent>
            </Bubble>
          </div>
        </div>
        <Marker variant="separator" className="mt-4">
          <MarkerContent>
            Nagkakamali si Yawts ah hinay hinay lang
          </MarkerContent>
        </Marker>
        <div className="sticky bottom-0 py-4">
          <div className="rounded-xl border bg-background shadow-lg">
            <InputGroup>
              <InputGroupTextarea
                placeholder="Send a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  className="ml-auto"
                  variant="default"
                  onClick={handleSend}
                >
                  <ArrowUpIcon />
                  <span className="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
