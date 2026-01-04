import styled from 'styled-components'
import { NodeViewWrapper } from '@tiptap/react'

export const StyledMermaidWrapper = styled(NodeViewWrapper)`
  position: relative;
  width: 100%;
  margin: 1rem 0; /* my-4 */
  background-color: white; /* bg-white */
  border: 1px solid #e5e7eb; /* border */
  border-radius: 0.5rem;

  /* Show actions on hover */
  &:hover .mermaid-actions {
    opacity: 1;
  }
`

export const StyledMermaidContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50px;

  svg {
    max-width: 100%;
    height: auto;
  }
`

export const StyledMermaidActions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 10;
`
