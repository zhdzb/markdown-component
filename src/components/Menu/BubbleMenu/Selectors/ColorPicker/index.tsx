import React from 'react'
import { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { Baseline, ChevronDownIcon } from 'lucide-react'
import { Button } from '@/ui/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover'
import { TEXT_COLORS, HIGHLIGHT_COLORS } from './constants'
import { StyledColorContainer } from './style'
import { useRecentColors } from '@/hooks/useRecentColors'
import { TextColorPreview, HighlightColorPreview } from '@/components/ColorItem'

interface ColorSelectorProps {
  editor: Editor
}

interface ColorState {
  textColor: string | undefined
  highlightColor: string | undefined
}

export const ColorSelector = ({ editor }: ColorSelectorProps) => {
  const { textColor, highlightColor } = useEditorState({
    editor,
    selector: (ctx): ColorState => {
      return {
        textColor: ctx.editor.getAttributes('textStyle').color,
        highlightColor: ctx.editor.getAttributes('highlight').color,
      }
    },
  })

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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-none gap-1 px-2">
          <Baseline className="size-4" style={{ color: textColor }} />
          <ChevronDownIcon className="size-3 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" noPortal>
        <StyledColorContainer>
          {/* recent color */}
          {recentColors.length > 0 && (
            <div className="section">
              <span className="section-title">Recent Colors</span>
              <div className="color-grid">
                {recentColors.map((item, index) => (
                  <button
                    key={`${item.type}-${item.value}-${index}`}
                    className={`color-btn ${
                      (item.type === 'text' && textColor === item.value) ||
                      (item.type === 'highlight' && highlightColor === item.value)
                        ? 'is-active'
                        : ''
                    }`}
                    onClick={() =>
                      item.type === 'text'
                        ? setTextColor(item.value)
                        : setHighlightColor(item.value)
                    }
                    title={item.value}
                  >
                    {item.type === 'text' ? (
                      <TextColorPreview color={item.value} />
                    ) : (
                      <HighlightColorPreview color={item.value} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="section">
            <span className="section-title">Text Color</span>
            <div className="color-grid">
              {TEXT_COLORS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setTextColor(item.value)}
                  className={`color-btn ${textColor === item.value ? 'is-active' : ''}`}
                  title={item.name}
                >
                  <TextColorPreview color={item.value} />
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="section-title">Highlight Color</span>
            <div className="color-grid">
              {HIGHLIGHT_COLORS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setHighlightColor(item.value)}
                  className={`color-btn ${highlightColor === item.value ? 'is-active' : ''}`}
                  title={item.name}
                >
                  <HighlightColorPreview color={item.value} />
                </button>
              ))}
            </div>
          </div>
        </StyledColorContainer>
      </PopoverContent>
    </Popover>
  )
}
