import { Editor, isTextSelection } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/react/menus'
import { NodeSelector } from './Selectors/TextNode'
import { ScrollBar } from '@/ui/ScrollArea'
import { Separator } from '@/ui/Separator'
import { StyledMenuScrollArea, StyledMenuContent } from './style'
import { TextButtons } from './Selectors/TextStyle'
import { TextAlignSelector } from './Selectors/TextAlign'
import { ColorSelector } from './Selectors/ColorPicker'

export const DefaultBubbleMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="bubbleMenu"
      appendTo={document.body}
      options={{
        placement: 'top',
        offset: 8,
      }}
      shouldShow={({ editor, state }) => {
        const { selection } = state
        const { empty } = selection

        if (!editor.isEditable) {
          return false
        }

        if (empty) {
          return false
        }

        if (!isTextSelection(selection)) {
          return false
        }

        if (editor.isActive('codeBlock')) {
          return false
        }

        return true
      }}
    >
      <StyledMenuScrollArea>
        <StyledMenuContent>
          <NodeSelector editor={editor} />
          <Separator orientation="vertical" />
          <TextButtons editor={editor} />
          <Separator orientation="vertical" />
          <ColorSelector editor={editor} />
          <Separator orientation="vertical" />
          <TextAlignSelector editor={editor} />
        </StyledMenuContent>
        <ScrollBar orientation="horizontal" />
      </StyledMenuScrollArea>
    </BubbleMenu>
  )
}
