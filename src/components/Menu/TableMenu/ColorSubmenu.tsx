import React from 'react'
import { Editor } from '@tiptap/core'
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuPortal,
  DropdownMenuLabel,
} from '@/ui/DropdownMenu'
import { TEXT_COLORS, HIGHLIGHT_COLORS } from '../BubbleMenu/Selectors/ColorPicker/constants'
import { useRecentColors } from '@/hooks/useRecentColors'
import { TextColorPreview, HighlightColorPreview } from '../../ColorItem'

interface TableColorSubmenuProps {
  editor: Editor
}

export const TableColorSubmenu = ({ editor }: TableColorSubmenuProps) => {
  const { recentColors, addRecentColor } = useRecentColors()

  const setTextColor = (color: string) => {
    if (color) {
      editor.chain().focus().setColor(color).run()
      addRecentColor(color, 'text')
    } else {
      editor.chain().focus().unsetColor().run()
    }
  }

  const setHighlightColor = (color: string) => {
    if (color) {
      editor.chain().focus().setHighlight({ color }).run()
      addRecentColor(color, 'highlight')
    } else {
      editor.chain().focus().unsetHighlight().run()
    }
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Colors</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="max-h-[300px] overflow-y-auto">
          {recentColors.length > 0 && (
            <>
              <DropdownMenuLabel>Recent Colors</DropdownMenuLabel>
              {recentColors.map((item, index) => (
                <DropdownMenuItem
                  key={`${item.type}-${item.value}-${index}`}
                  onClick={() =>
                    item.type === 'text' ? setTextColor(item.value) : setHighlightColor(item.value)
                  }
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    {item.type === 'text' ? (
                      <TextColorPreview color={item.value} />
                    ) : (
                      <HighlightColorPreview color={item.value} />
                    )}
                  </div>
                  <span>
                    {/* Try to find the name from constants, otherwise use value or Default */}
                    {item.type === 'text'
                      ? TEXT_COLORS.find(c => c.value === item.value)?.name ||
                        (item.value ? item.value : 'Default')
                      : HIGHLIGHT_COLORS.find(c => c.value === item.value)?.name ||
                        (item.value ? item.value : 'Default')}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuLabel>Text Color</DropdownMenuLabel>
          {TEXT_COLORS.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => setTextColor(item.value)}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-5 h-5">
                <TextColorPreview color={item.value} />
              </div>
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Highlight Color</DropdownMenuLabel>
          {HIGHLIGHT_COLORS.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => setHighlightColor(item.value)}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-5 h-5">
                <HighlightColorPreview color={item.value} />
              </div>
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
