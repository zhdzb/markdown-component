import React from 'react'
import { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { Baseline, ChevronDownIcon } from 'lucide-react'
import { Button } from '@/ui/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover'
import { TEXT_COLORS, HIGHLIGHT_COLORS } from './constants'
import {
  StyledColorContainer,
  StyledSection,
  StyledSectionTitle,
  StyledGrid,
  StyledColorButton,
} from './style'

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

  const setTextColor = (color: string) => {
    if (color) {
      editor.chain().focus().setColor(color).run()
    } else {
      editor.chain().focus().unsetColor().run()
    }
  }

  const setHighlightColor = (color: string) => {
    if (color) {
      editor.chain().focus().setHighlight({ color }).run()
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
          <StyledSection>
            <StyledSectionTitle>Text Color</StyledSectionTitle>
            <StyledGrid>
              {TEXT_COLORS.map((item, index) => (
                <StyledColorButton
                  key={index}
                  onClick={() => setTextColor(item.value)}
                  isActive={textColor === item.value}
                  title={item.name}
                >
                  <span
                    style={{
                      color: item.value || '#000',
                      fontSize: '1rem',
                      fontWeight: 500,
                    }}
                  >
                    A
                  </span>
                </StyledColorButton>
              ))}
            </StyledGrid>
          </StyledSection>

          <StyledSection>
            <StyledSectionTitle>Highlight Color</StyledSectionTitle>
            <StyledGrid>
              {HIGHLIGHT_COLORS.map((item, index) => (
                <StyledColorButton
                  key={index}
                  onClick={() => setHighlightColor(item.value)}
                  isActive={highlightColor === item.value}
                  title={item.name}
                >
                  <div
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '50%',
                      backgroundColor: item.value || 'transparent',
                      border: item.value ? 'none' : '1px solid #e5e7eb',
                      position: 'relative',
                    }}
                  >
                    {!item.value && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) rotate(45deg)',
                          width: '100%',
                          height: '1px',
                          backgroundColor: '#ef4444',
                        }}
                      />
                    )}
                  </div>
                </StyledColorButton>
              ))}
            </StyledGrid>
          </StyledSection>
        </StyledColorContainer>
      </PopoverContent>
    </Popover>
  )
}
