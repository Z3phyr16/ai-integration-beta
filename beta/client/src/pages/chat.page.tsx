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
import { useConversationContext } from "@/components/ui/conversation-provider"
import { useNavigate } from "react-router-dom"
const ChatPage = () => {
  const navigate = useNavigate()
  const { conversationId } = useParams()
  const { title, loadingChat, loading, messages, setLoading, sendMessage } =
    useChat(Number(conversationId) || 0)

  const conversationHook = useConversationContext()
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<File | null>(null)

  const [message, setMessage] = useState("")
  const handleSend = async () => {
    const trimmed = message.trim()

    if (!trimmed) return
    setMessage("")
    if (!conversationId) {
      setLoading(true)
      const response = await conversationHook.addConversation(trimmed)
      if (response.success) {
        const newId = response.data.id
        navigate(`/c/${newId}`)
        await sendMessage(trimmed, newId)
      }
      setLoading(false)
    } else {
      await sendMessage(trimmed)
    }
  }
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile()

        if (file) {
          setImage(file)
        }
      }
    }
  }
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Creating Conversation</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    )
  }
  if (!conversationId) {
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
                onPaste={handlePaste}
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
