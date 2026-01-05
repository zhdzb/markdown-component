import { CustomStarterKit } from './StarterKit'
import { CustomHeading } from './Heading'
import { SlashCommand } from './SlashCommand'
import { SlashCommandDecoration } from './SlashCommand/slashCommandDecoration'
import { getSuggestion } from './SlashCommand/suggestion'
import { CustomImage, OnUploadImage } from './Image'
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

export type { OnUploadImage } from './Image'

export interface ExtensionFactoryOptions {
  onUploadImage?: OnUploadImage
}

export const createExtensions = (options: ExtensionFactoryOptions = {}) => {
  const suggestion = getSuggestion({
    onUploadImage: options.onUploadImage,
  })

  return [
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
    CustomImage,
    SlashCommand.configure({
      suggestion,
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
}

export const CustomExtensions = createExtensions()
