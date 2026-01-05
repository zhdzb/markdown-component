import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'
import { DropdownMenu, DropdownMenuGroup, DropdownMenuSeparator } from '@/ui/DropdownMenu'
import { StyledBlockMenuContent, StyledDestructiveMenuItem, StyledShortcut } from './style'
import { TurnIntoSubmenu, BlockColorSubmenu } from './SubMenu'
import { isTurnableNode } from './types'
import { Trash2Icon } from 'lucide-react'

interface BlockMenuProps {
  editor: Editor
  currentNode: ProseMirrorNode | null
  currentNodePos: number
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const DragBlockMenu = ({
  editor,
  currentNode,
  currentNodePos,
  open,
  onOpenChange,
  children,
}: BlockMenuProps) => {
  // 确保节点被选中
  const ensureNodeSelected = () => {
    if (!currentNode || currentNodePos < 0) return false

    const { state, dispatch } = editor.view
    const currentSelection = state.selection

    // 如果当前不是 NodeSelection 或者选中的不是这个节点，则重新选中
    if (!(currentSelection instanceof NodeSelection) || currentSelection.from !== currentNodePos) {
      const selection = NodeSelection.create(state.doc, currentNodePos)
      dispatch(state.tr.setSelection(selection))
      return true
    }
    return false
  }

  const handleDelete = () => {
    if (currentNode && currentNodePos >= 0) {
      ensureNodeSelected()
      editor
        .chain()
        .focus()
        .deleteRange({
          from: currentNodePos,
          to: currentNodePos + currentNode.nodeSize,
        })
        .run()
    }
    onOpenChange(false)
  }

  const showTurnInto = isTurnableNode(currentNode)
  const showColor = isTurnableNode(currentNode)

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal>
      {children}
      <StyledBlockMenuContent side="right" align="start" sideOffset={8}>
        {showTurnInto && (
          <DropdownMenuGroup>
            <TurnIntoSubmenu
              editor={editor}
              currentNode={currentNode}
              currentNodePos={currentNodePos}
            />
          </DropdownMenuGroup>
        )}

        {showColor && (
          <>
            {showTurnInto && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              <BlockColorSubmenu editor={editor} currentNodePos={currentNodePos} />
            </DropdownMenuGroup>
          </>
        )}

        {(showTurnInto || showColor) && <DropdownMenuSeparator />}

        <DropdownMenuGroup>
          <StyledDestructiveMenuItem onClick={handleDelete}>
            <Trash2Icon size={16} />
            <span>Delete</span>
            <StyledShortcut>Backspace</StyledShortcut>
          </StyledDestructiveMenuItem>
        </DropdownMenuGroup>
      </StyledBlockMenuContent>
    </DropdownMenu>
  )
}

export { isTurnableNode, getNodeTypeName } from './types'
