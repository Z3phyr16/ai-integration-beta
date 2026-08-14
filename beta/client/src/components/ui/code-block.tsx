import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface Props {
  code: string
  language: string
}

export function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-sm text-muted-foreground">{language}</span>

        <button onClick={copy} className="text-sm hover:underline">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter language={language} style={oneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
