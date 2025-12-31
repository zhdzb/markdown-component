import styled from 'styled-components'
import { EditorContent } from '@tiptap/react'
import { StyledExtensions } from '../components/extensions/extensionsStyle'


export const StyledMarkdownEditor = styled(EditorContent)`
  width: 100%;
  height: 100%;
  ${StyledExtensions}
`
