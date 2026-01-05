import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { NodeSelection } from '@tiptap/pm/state'
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/ui/DropdownMenu'
import {
  CheckIcon,
  Heading1,
  Heading2,
  Heading3,
  LetterTextIcon,
  List,
  ListOrdered,
  CheckSquare,
  QuoteIcon,
  CodeIcon,
  LucideIcon,
  CornerDownRightIcon,
} from 'lucide-react'
import {
  StyledTurnIntoTrigger,
  StyledTurnIntoItem,
  StyledTurnIntoIcon,
  StyledTurnIntoName,
  StyledTurnIntoSpacer,
  StyledTurnIntoCheck,
} from './style'

interface TurnIntoItem {
  id: string
  name: string
  icon: LucideIcon
  isActive: (node: ProseMirrorNode) => boolean
  action: (editor: Editor) => void
}

const turnIntoItems: TurnIntoItem[] = [
  {
    id: 'paragraph',
    name: 'Text',
    icon: LetterTextIcon,
    isActive: node => node.type.name === 'paragraph',
    action: editor => {
      // 先取消列表和引用，再设置为段落
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .setNode('paragraph')
        .run()
    },
  },
  {
    id: 'heading1',
    name: 'Heading 1',
    icon: Heading1,
    isActive: node => node.type.name === 'heading' && node.attrs.level === 1,
    action: editor => {
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .setNode('heading', { level: 1 })
        .run()
    },
  },
  {
    id: 'heading2',
    name: 'Heading 2',
    icon: Heading2,
    isActive: node => node.type.name === 'heading' && node.attrs.level === 2,
    action: editor => {
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .setNode('heading', { level: 2 })
        .run()
    },
  },
  {
    id: 'heading3',
    name: 'Heading 3',
    icon: Heading3,
    isActive: node => node.type.name === 'heading' && node.attrs.level === 3,
    action: editor => {
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .setNode('heading', { level: 3 })
        .run()
    },
  },
  {
    id: 'bulletList',
    name: 'Bullet List',
    icon: List,
    isActive: node => node.type.name === 'bulletList',
    action: editor => {
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .toggleBulletList()
        .run()
    },
  },
  {
    id: 'orderedList',
    name: 'Ordered List',
    icon: ListOrdered,
    isActive: node => node.type.name === 'orderedList',
    action: editor => {
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .toggleOrderedList()
        .run()
    },
  },
  {
    id: 'taskList',
    name: 'Task List',
    icon: CheckSquare,
    isActive: node => node.type.name === 'taskList',
    action: editor => {
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .toggleTaskList()
        .run()
    },
  },
  {
    id: 'blockquote',
    name: 'Blockquote',
    icon: QuoteIcon,
    isActive: node => node.type.name === 'blockquote',
    action: editor => {
      editor.chain().focus().lift('listItem').lift('taskItem').toggleBlockquote().run()
    },
  },
  {
    id: 'codeBlock',
    name: 'Code Block',
    icon: CodeIcon,
    isActive: node => node.type.name === 'codeBlock',
    action: editor => {
      editor
        .chain()
        .focus()
        .lift('listItem')
        .lift('taskItem')
        .lift('blockquote')
        .toggleCodeBlock()
        .run()
    },
  },
]

interface TurnIntoSubmenuProps {
  editor: Editor
  currentNode: ProseMirrorNode | null
  currentNodePos: number
}

export const TurnIntoSubmenu = ({ editor, currentNode, currentNodePos }: TurnIntoSubmenuProps) => {
  if (!currentNode) return null

  // 确保节点被选中
  const ensureNodeSelected = () => {
    if (currentNodePos < 0) return false

    const { state, dispatch } = editor.view
    const currentSelection = state.selection

    if (!(currentSelection instanceof NodeSelection) || currentSelection.from !== currentNodePos) {
      const selection = NodeSelection.create(state.doc, currentNodePos)
      dispatch(state.tr.setSelection(selection))
      return true
    }
    return false
  }

  const handleItemClick = (action: (editor: Editor) => void) => {
    const selected = ensureNodeSelected()
    if (selected) {
      // 如果重新选中了节点，需要等待下一个事件循环
      requestAnimationFrame(() => {
        action(editor)
      })
    } else {
      // 如果节点已经选中，直接执行
      action(editor)
    }
  }

  return (
    <DropdownMenuSub>
      <StyledTurnIntoTrigger>
        <CornerDownRightIcon size={16} />
        <span>Turn Into</span>
      </StyledTurnIntoTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent style={{ minWidth: '160px' }}>
          {turnIntoItems.map(item => {
            const isActive = item.isActive(currentNode)
            return (
              <StyledTurnIntoItem key={item.id} onClick={() => handleItemClick(item.action)}>
                <StyledTurnIntoIcon>
                  <item.icon size={16} />
                </StyledTurnIntoIcon>
                <StyledTurnIntoName>{item.name}</StyledTurnIntoName>
                <StyledTurnIntoSpacer />
                {isActive && (
                  <StyledTurnIntoCheck>
                    <CheckIcon size={16} />
                  </StyledTurnIntoCheck>
                )}
              </StyledTurnIntoItem>
            )
          })}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
