import React, { useState, useCallback, useRef, useEffect } from 'react'
import { DragHandle } from '@tiptap/extension-drag-handle-react'
import { Editor } from '@tiptap/react'
import { Plus, GripVertical } from 'lucide-react'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'
import { CellSelection, TableMap } from '@tiptap/pm/tables'
import { HandleContainer, ActionButton, DragIconWrapper } from './style'

interface GlobalDragHandleProps {
  editor: Editor
}

export const GlobalDragHandle = ({ editor }: GlobalDragHandleProps) => {
  const [currentNode, setCurrentNode] = useState<{ node: any; pos: number } | null>(null)
  const handleContainerRef = useRef<HTMLDivElement>(null)

  const handleNodeChange = useCallback((data: { node: any; pos: number; editor: Editor }) => {
    if (data.node) {
      setCurrentNode({ node: data.node, pos: data.pos })
    } else {
      setCurrentNode(null)
    }
  }, [])

  const selectCurrentNode = useCallback(() => {
    if (!currentNode) return
    const { state, dispatch } = editor.view
    const node = currentNode.node

    if (node?.type?.name === 'table') {
      const tableStart = currentNode.pos + 1
      const map = TableMap.get(node)
      const firstCellPos = tableStart + map.map[0]
      const lastCellPos = tableStart + map.map[map.map.length - 1]
      const selection = CellSelection.create(state.doc, firstCellPos, lastCellPos)
      dispatch(state.tr.setSelection(selection))
      return
    }

    const selection = NodeSelection.create(state.doc, currentNode.pos)
    dispatch(state.tr.setSelection(selection))
  }, [currentNode, editor.view])

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

  const handleDragIconMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectCurrentNode()
  }

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const withinHandle = handleContainerRef.current?.contains(target ?? null)
      const withinEditor = editor.view.dom.contains(target)

      // 点击编辑器外或其他区域时，如果当前为 NodeSelection 则转换为文本选区以去除选中态
      if (!withinHandle && !withinEditor) {
        const { state, dispatch } = editor.view
        if (state.selection instanceof NodeSelection) {
          const pos = state.selection.from
          dispatch(state.tr.setSelection(TextSelection.create(state.doc, pos)))
        }
      }
    }

    document.addEventListener('mousedown', handleDocumentMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown)
    }
  }, [editor.view])

  return (
    <DragHandle editor={editor} onNodeChange={handleNodeChange}>
      <HandleContainer ref={handleContainerRef}>
        <ActionButton onClick={handleAdd} title="Add new block">
          <Plus size={16} />
        </ActionButton>
        <DragIconWrapper onMouseDown={handleDragIconMouseDown}>
          <GripVertical size={16} />
        </DragIconWrapper>
      </HandleContainer>
    </DragHandle>
  )
}
