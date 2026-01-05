import { ReactNodeViewProps } from '@tiptap/react'
import { EditIcon } from 'lucide-react'
import mermaid from 'mermaid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/ui/Button'
import { Textarea } from '@/ui/Textarea'
import { StyledMermaidWrapper, StyledMermaidContainer, StyledMermaidActions } from './style'

export function MermaidView({
  editor,
  getPos,
  node,
  HTMLAttributes,
  extension,
}: ReactNodeViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(node.textContent)

  const { options } = extension
  const [mermaidInitialized, setMermaidInitialized] = useState(false)

  // Initialize mermaid
  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
      })
      setMermaidInitialized(true)
    }
  }, [mermaidInitialized])

  // Update local content state when node content changes (e.g. undo/redo)
  useEffect(() => {
    let text = ''
    if (node.content && node.content.size > 0) {
      text = node.content.textBetween(0, node.content.size, '\n')
    } else if (node.textContent) {
      text = node.textContent
    } else {
      // Try to get from child nodes
      node.forEach(child => {
        if (child.type.name === 'text') {
          text += child.text || ''
        }
      })
    }
    setContent(text)
  }, [node])

  const updateContent = useCallback(() => {
    const pos = getPos()
    if (pos === undefined) {
      return
    }

    // Only update if content changed
    if (content !== node.textContent) {
      editor.chain().focus().setNodeSelection(pos).updateMermaid({ code: content }).run()
    }
  }, [editor, getPos, content, node.textContent])

  const handleBlur = useCallback(() => {
    updateContent()
    setIsEditing(false)
  }, [updateContent])

  // Get the code content from node
  const getNodeCode = useCallback(() => {
    let code = ''
    if (node.content && node.content.size > 0) {
      code = node.content.textBetween(0, node.content.size, '\n')
    } else if (node.textContent) {
      code = node.textContent
    } else {
      node.forEach(child => {
        if (child.type.name === 'text') {
          code += child.text || ''
        }
      })
    }
    console.log('getNodeCode', code, node.content)
    return code.trim()
  }, [node])

  const renderDiagram = useCallback(async () => {
    if (isEditing || !mermaidInitialized) return

    const code = getNodeCode()

    // Debug logging
    // console.log('Mermaid render - node:', {
    //   hasContent: !!node.content,
    //   contentSize: node.content?.size || 0,
    //   textContent: node.textContent,
    //   extractedCode: code,
    //   nodeType: node.type.name,
    // })

    if (!code) {
      if (containerRef.current) {
        containerRef.current.innerHTML =
          '<div class="text-gray-500 p-2 text-sm">Empty Mermaid diagram</div>'
      }
      return
    }

    try {
      const id = 'm-' + Math.random().toString(36).substring(2, 10)
      // Mermaid render needs the element to be in the DOM
      if (containerRef.current) {
        // Clear previous content
        containerRef.current.innerHTML = ''
        const result = await mermaid.render(id, code)
        containerRef.current.innerHTML = result.svg
      }
    } catch (error: any) {
      console.error('Mermaid render error:', error)
      // Optional: Display error in the container or just fallback
      if (containerRef.current) {
        const errorMessage = error.message || 'Unknown error'
        containerRef.current.innerHTML = `<div class="text-red-500 p-2 text-sm">Mermaid Syntax Error: ${errorMessage}</div>`
      }
    }
  }, [node, isEditing, mermaidInitialized, getNodeCode])

  useEffect(() => {
    renderDiagram()
  }, [renderDiagram])

  // Also trigger render when node content changes
  useEffect(() => {
    if (!isEditing && mermaidInitialized) {
      renderDiagram()
    }
  }, [node.textContent, node.content, isEditing, mermaidInitialized, renderDiagram])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  if (isEditing) {
    return (
      <StyledMermaidWrapper>
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={e => setContent(e.target.value)}
          onBlur={handleBlur}
          spellCheck={false}
          placeholder="Enter Mermaid code..."
          autoResize
        />
      </StyledMermaidWrapper>
    )
  }

  return (
    <StyledMermaidWrapper>
      <StyledMermaidContainer
        ref={containerRef}
        className={`${options.HTMLAttributes?.class} ${HTMLAttributes.class}`}
      />
      <StyledMermaidActions className="mermaid-actions">
        <Button
          variant="ghost"
          size="icon-sm"
          className="edit-btn"
          onClick={() => setIsEditing(true)}
          type="button"
        >
          <EditIcon size={14} />
        </Button>
      </StyledMermaidActions>
    </StyledMermaidWrapper>
  )
}
