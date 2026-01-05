import React, { useMemo } from 'react'
import { Editor, useEditor } from '@tiptap/react'

import { StyledMarkdownEditor } from './StyledMarkdownEditor'
import { createExtensions, OnUploadImage } from '../components/extensions/extensions'
import { markdownToHtml } from '../utils/markdown'
import { isMarkdownString } from '../utils/isMarkdownString'
import { TableHandle } from '../components/Menu/TableMenu'
import { DefaultBubbleMenu } from '@/components/Menu/BubbleMenu'
import { GlobalDragHandle } from '../components/extensions/DragHandle'

export interface MarkdownEditorProps {
  content: string
  isFullScreen: boolean
  theme: 'light' | 'dark'
  zoom: number
  onBlur: () => void
  onUpdate: (editor: Editor) => void
  onUploadImage?: OnUploadImage
}

export const MarkdownEditor = ({
  content,
  isFullScreen,
  theme,
  zoom,
  onBlur,
  onUpdate,
  onUploadImage,
}: MarkdownEditorProps) => {
  // 检测 content 是否为 Markdown 格式，如果是则转换为 HTML
  const htmlContent = useMemo(() => {
    console.log('content=>html', content)
    if (!content) return ''

    // 转换为 HTML
    if (isMarkdownString(content)) {
      return markdownToHtml(content)
    }
    console.log(content)
    // 否则直接返回（可能是 HTML 或空字符串）
    return content
  }, [content])

  const extensions = useMemo(() => createExtensions({ onUploadImage }), [onUploadImage])

  const editor = useEditor({
    extensions,
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
      <GlobalDragHandle editor={editor} />
      <DefaultBubbleMenu editor={editor} />
    </>
  )
}
