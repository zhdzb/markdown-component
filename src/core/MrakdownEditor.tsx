import React from 'react'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { StyledMarkdownEditor } from './StyledMarkdownEditor'
import { CustomExtensions } from '../components/extensions/extensions'
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
  const editor = useEditor({
    extensions: [...CustomExtensions],
    content,
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
    </>
  )
}
