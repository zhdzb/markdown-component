import React, { useState, useCallback } from 'react'
import { DragHandle } from '@tiptap/extension-drag-handle-react'
import { Editor } from '@tiptap/react'
import { Plus, GripVertical } from 'lucide-react'
import { HandleContainer, ActionButton, DragIconWrapper } from './style'

interface GlobalDragHandleProps {
  editor: Editor
}

export const GlobalDragHandle = ({ editor }: GlobalDragHandleProps) => {
  const [currentNode, setCurrentNode] = useState<{ node: any; pos: number } | null>(null)

  const handleNodeChange = useCallback((data: { node: any; pos: number; editor: Editor }) => {
    if (data.node) {
      setCurrentNode({ node: data.node, pos: data.pos })
    } else {
      setCurrentNode(null)
    }
  }, [])

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentNode || !editor) return

    const { pos, node } = currentNode
    const endPos = pos + node.nodeSize

    editor
      .chain()
      .focus()
      // Insert a new paragraph with '/' content after the current block
      .insertContentAt(endPos, {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: '/',
          },
        ],
      })
      // Set cursor after the '/'
      .setTextSelection(endPos + 2)
      .run()
  }

  return (
    <DragHandle
      editor={editor}
      onNodeChange={handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 10,
      }}
    >
      <HandleContainer>
        <ActionButton onClick={handleAdd} title="Add new block">
          <Plus size={16} />
        </ActionButton>
        <DragIconWrapper>
          <GripVertical size={16} />
        </DragIconWrapper>
      </HandleContainer>
    </DragHandle>
  )
}
