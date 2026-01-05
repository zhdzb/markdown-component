import { Editor } from '@tiptap/core'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
  DropdownMenuLabel,
} from '@/ui/DropdownMenu'
import { TEXT_COLORS, HIGHLIGHT_COLORS } from '../../BubbleMenu/Selectors/ColorPicker/constants'
import { useRecentColors } from '@/hooks/useRecentColors'
import { TextColorPreview, HighlightColorPreview } from '../../../ColorItem'
import { PaletteIcon } from 'lucide-react'
import { StyledColorTrigger, StyledColorItem, StyledColorPreview } from './style'

interface BlockColorSubmenuProps {
  editor: Editor
  currentNodePos: number
}

export const BlockColorSubmenu = ({ editor, currentNodePos }: BlockColorSubmenuProps) => {
  const { recentColors, addRecentColor } = useRecentColors()

  // 将 NodeSelection 转换为 TextSelection，以便颜色命令可以正常工作
  const convertToTextSelection = () => {
    const { state, dispatch } = editor.view
    const selection = state.selection

    if (selection instanceof NodeSelection) {
      const { from } = selection
      const node = selection.node

      // 找到节点内部的实际文本范围
      // 对于块节点，文本内容通常在 from+1 到 from+node.content.size+1 之间
      let textStart = from + 1
      let textEnd = from + 1

      if (node.content.size > 0) {
        // 对于有内容的节点，选中其内部的所有文本
        // 使用 resolve 来找到节点内容的起始位置
        const $pos = state.doc.resolve(from)
        textStart = from + 1 // 跳过节点开始标记

        // 找到节点内容的结束位置
        // 遍历节点内容找到所有文本节点
        let firstTextPos = -1
        let lastTextPos = -1

        state.doc.nodesBetween(from, from + node.nodeSize, (node, pos) => {
          if (node.isText) {
            if (firstTextPos === -1) {
              firstTextPos = pos
            }
            lastTextPos = pos + node.nodeSize
          }
        })

        if (firstTextPos !== -1 && lastTextPos !== -1) {
          textStart = firstTextPos
          textEnd = lastTextPos
        } else {
          // 如果没有找到文本节点，使用节点内容的范围
          textEnd = from + node.content.size + 1
        }
      }

      // 创建文本选区
      try {
        const textSelection = TextSelection.create(state.doc, textStart, textEnd)
        const tr = state.tr.setSelection(textSelection)
        dispatch(tr)
        return true
      } catch (e) {
        // 如果创建选区失败，尝试使用节点内的第一个位置
        try {
          const fallbackSelection = TextSelection.create(state.doc, from + 1)
          const tr = state.tr.setSelection(fallbackSelection)
          dispatch(tr)
          return true
        } catch (e2) {
          console.error('Failed to convert NodeSelection to TextSelection', e2)
          return false
        }
      }
    }
    return false
  }

  const setTextColor = (color: string) => {
    const { state, dispatch } = editor.view

    // 先确保节点被选中
    let tr = state.tr
    const currentSelection = state.selection
    if (!(currentSelection instanceof NodeSelection) || currentSelection.from !== currentNodePos) {
      const selection = NodeSelection.create(state.doc, currentNodePos)
      tr = tr.setSelection(selection)
      dispatch(tr)
    }

    // 转换选区
    convertToTextSelection()

    // 执行颜色命令
    setTimeout(() => {
      if (color) {
        editor.chain().focus().setColor(color).run()
        addRecentColor(color, 'text')
      } else {
        editor.chain().focus().unsetColor().run()
      }
    }, 50)
  }

  const setHighlightColor = (color: string) => {
    const { state, dispatch } = editor.view

    // 先确保节点被选中
    let tr = state.tr
    const currentSelection = state.selection
    if (!(currentSelection instanceof NodeSelection) || currentSelection.from !== currentNodePos) {
      const selection = NodeSelection.create(state.doc, currentNodePos)
      tr = tr.setSelection(selection)
      dispatch(tr)
    }

    // 转换选区
    convertToTextSelection()

    // 执行颜色命令
    setTimeout(() => {
      if (color) {
        editor.chain().focus().setHighlight({ color }).run()
        addRecentColor(color, 'highlight')
      } else {
        editor.chain().focus().unsetHighlight().run()
      }
    }, 50)
  }

  return (
    <DropdownMenuSub>
      <StyledColorTrigger>
        <PaletteIcon size={16} />
        <span>Color</span>
      </StyledColorTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          style={{ maxHeight: '300px', overflowY: 'auto', minWidth: '180px' }}
        >
          {recentColors.length > 0 && (
            <>
              <DropdownMenuLabel>Recent Colors</DropdownMenuLabel>
              {recentColors.map((item, index) => (
                <StyledColorItem
                  key={`${item.type}-${item.value}-${index}`}
                  onClick={() =>
                    item.type === 'text' ? setTextColor(item.value) : setHighlightColor(item.value)
                  }
                >
                  <StyledColorPreview>
                    {item.type === 'text' ? (
                      <TextColorPreview color={item.value} />
                    ) : (
                      <HighlightColorPreview color={item.value} />
                    )}
                  </StyledColorPreview>
                  <span>
                    {item.type === 'text'
                      ? TEXT_COLORS.find(c => c.value === item.value)?.name ||
                        (item.value ? item.value : 'Default')
                      : HIGHLIGHT_COLORS.find(c => c.value === item.value)?.name ||
                        (item.value ? item.value : 'Default')}
                  </span>
                </StyledColorItem>
              ))}
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuLabel>Text Color</DropdownMenuLabel>
          {TEXT_COLORS.map((item, index) => (
            <StyledColorItem key={index} onClick={() => setTextColor(item.value)}>
              <StyledColorPreview>
                <TextColorPreview color={item.value} />
              </StyledColorPreview>
              <span>{item.name}</span>
            </StyledColorItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Background Color</DropdownMenuLabel>
          {HIGHLIGHT_COLORS.map((item, index) => (
            <StyledColorItem key={index} onClick={() => setHighlightColor(item.value)}>
              <StyledColorPreview>
                <HighlightColorPreview color={item.value} />
              </StyledColorPreview>
              <span>{item.name}</span>
            </StyledColorItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
