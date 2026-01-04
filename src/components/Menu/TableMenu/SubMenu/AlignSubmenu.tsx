import React from 'react'
import { Editor } from '@tiptap/core'
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from '@/ui/DropdownMenu'

export const AlignSubmenu = ({ editor }: { editor: Editor }) => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Alignment</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().setCellAttribute('horizontalAlign', 'left').run()
            }}
          >
            Align left
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().setCellAttribute('horizontalAlign', 'center').run()
            }}
          >
            Align center
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().setCellAttribute('horizontalAlign', 'right').run()
            }}
          >
            Align right
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().setCellAttribute('verticalAlign', 'top').run()
            }}
          >
            Align top
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().setCellAttribute('verticalAlign', 'middle').run()
            }}
          >
            Align middle
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().setCellAttribute('verticalAlign', 'bottom').run()
            }}
          >
            Align bottom
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
