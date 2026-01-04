import { CustomStarterKit } from './StarterKit'
import { CustomHeading } from './Heading'
import { SlashCommand } from './SlashCommand'
import { SlashCommandDecoration } from './SlashCommand/slashCommandDecoration'
import { getSuggestion } from './SlashCommand/suggestion'
import { CustomTable, CustomTableHeader, CustomTableCell, CustomTableRow } from './table'
import { PasteMarkdown } from './PasteMarkdown'
import { CustomCodeBlock } from './CodeBlock'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { Mermaid } from './mermaid'
import { CustomTaskItem, CustomTaskList } from './TaskList'
import { Placeholder } from '@tiptap/extensions'

export const CustomExtensions = [
  CustomStarterKit,
  Placeholder.configure({
    placeholder: 'Type / to search commands...',
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'is-empty',
  }),
  CustomHeading,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'math'],
  }),
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  SlashCommand.configure({
    suggestion: getSuggestion(),
  }),
  SlashCommandDecoration,
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
  CustomTaskList,
  CustomTaskItem,
]
