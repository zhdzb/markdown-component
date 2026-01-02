import { CustomStarterKit } from './StarterKit'
import { CustomHeading } from './Heading'
import { SlashCommand } from './SlashCommand'
import { getSuggestion } from './SlashCommand/suggestion'
import { CustomTable, CustomTableHeader, CustomTableCell, CustomTableRow } from './table'
import { PasteMarkdown } from './PasteMarkdown'
import { CustomCodeBlock } from './CodeBlock'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { Mermaid } from './mermaid'

export const CustomExtensions = [
  CustomStarterKit,
  CustomHeading,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  SlashCommand.configure({
    suggestion: getSuggestion(),
  }),
  PasteMarkdown,
  CustomTable.configure({
    lastColumnResizable: false,
    allowTableNodeSelection: true,
    resizable: true,
  }),
  CustomTableHeader,
  CustomTableCell,
  CustomTableRow,
  CustomCodeBlock,
  Mermaid,
]
