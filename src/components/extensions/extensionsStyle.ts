import { css } from 'styled-components'
import { StyledStarterKit } from './StarterKit/style'
import { StyledTable } from './table/style'
import { StyledTaskList } from './TaskList/style'
import { SlashCommandDecorationStyle } from './SlashCommand/style'

export const StyledExtensions = css`
  ${StyledStarterKit}
  ${StyledTable}
  ${StyledTaskList}
  ${SlashCommandDecorationStyle}
`
