import { CustomStarterKit } from './StarterKit'
import { CustomHeading } from './Heading'
import { SlashCommand } from './SlashCommand'
import { getSuggestion } from './SlashCommand/suggestion'
import { CustomTable, CustomTableHeader, CustomTableCell, CustomTableRow } from './table'
import { PasteMarkdown } from './PasteMarkdown'
import { CustomCodeBlock } from './CodeBlock'

export const CustomExtensions = [
  CustomStarterKit,
  CustomHeading,
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
]
