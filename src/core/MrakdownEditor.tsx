import React, { useMemo, useEffect } from 'react'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { StyledMarkdownEditor } from './StyledMarkdownEditor'
import { CustomExtensions } from '../components/extensions/extensions'
import { markdownToHtml } from '../utils/markdown'
import { isMarkdownString } from '../utils/isMarkdownString'
import { TableHandle } from '../components/Menu/TableMenu'
import { DefaultBubbleMenu } from '@/components/Menu/BubbleMenu'
interface MarkdownEditorProps {
  content: string
  isFullScreen: boolean
  theme: 'light' | 'dark'
  zoom: number
  onBlur: () => void
  onUpdate: (editor: Editor) => void
}

export const MarkdownEditor = ({
  content,
  isFullScreen,
  theme,
  zoom,
  onBlur,
  onUpdate,
}: MarkdownEditorProps) => {
  // 检测 content 是否为 Markdown 格式，如果是则转换为 HTML
  const htmlContent = useMemo(() => {
    if (!content) return ''

    // 如果看起来像 Markdown，转换为 HTML
    if (isMarkdownString(content)) {
      return markdownToHtml(content)
    }

    // 否则直接返回（可能是 HTML 或空字符串）
    return content
  }, [content])

  const editor = useEditor({
    extensions: [...CustomExtensions],
    content: htmlContent,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor)
    },
    onContentError: error => {
      console.error(error)
    },
  })

  return (
    <>
      <StyledMarkdownEditor editor={editor} />
      <TableHandle editor={editor} />
      <DefaultBubbleMenu editor={editor} />
    </>
  )
}
