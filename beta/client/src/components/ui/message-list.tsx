import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { CodeBlock } from "@/components/ui/code-block"
import type { Message } from "@/types/chat.types"

type MessageListProps = {
  messages: Message[]
}

const markdownComponents = {
  code(props: any) {
    const { children, className } = props

    const match = /language-(\w+)/.exec(className || "")

    const language = match?.[1]

    const code = String(children).replace(/\n$/, "")

    if (language) {
      return <CodeBlock code={code} language={language} />
    }

    return <code className="rounded bg-muted px-1 py-0.5">{children}</code>
  },
}

export const MessageList = React.memo(function MessageList({
  messages,
}: MessageListProps) {
  const API_URL = import.meta.env.VITE_API_URL

  return (
    <>
      {messages.map((message) => {
        const renderedContent =
          message.contentType === "razor"
            ? `\`\`\`razor
${message.content}
\`\`\``
            : message.content

        return (
          <Bubble
            key={message.id}
            variant={message.role === "USER" ? "secondary" : "ghost"}
            align={message.role === "USER" ? "end" : "start"}
          >
            <BubbleContent
              className={
                message.role === "USER" ? "max-w-[450px]" : "max-w-none"
              }
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {renderedContent}
              </ReactMarkdown>

              {message.imagePath && (
                <img
                  src={`${API_URL}uploads/${message.imagePath}`}
                  alt="Uploaded"
                  loading="lazy"
                  className="mb-2 max-w-sm rounded-lg border"
                />
              )}
            </BubbleContent>
          </Bubble>
        )
      })}
    </>
  )
})
