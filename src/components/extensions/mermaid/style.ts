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

export const StyledMermaidEditor = styled.textarea`
  width: 100%;
  height: fit-content;
  min-height: 200px;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  resize: vertical;
  outline: none;
  overflow: hidden;

  /* Match CodeBlock styles */
  background-color: rgb(247, 247, 247);
  color: rgb(53, 54, 57);

  .dark & {
    background-color: rgb(17, 24, 39);
    color: rgb(229, 231, 235);
  }

  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: -2px;
  }
`
