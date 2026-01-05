import styled from 'styled-components'
import { NodeViewWrapper } from '@tiptap/react'

export const StyledImageWrapper = styled(NodeViewWrapper)`
  width: 100%;
  display: block;
  margin: 0.75rem 0;

  .tiptap-image-row {
    width: 100%;
  }

  .tiptap-image-container {
    margin: 0 auto;
    max-width: 100%;
  }

  .tiptap-image-content {
    position: relative;
    display: inline-block;
    max-width: 100%;
  }

  .tiptap-image-img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
  }

  .tiptap-image-resize-handle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 36px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.15s ease;
    cursor: ew-resize;
    user-select: none;
    pointer-events: none;
  }

  .tiptap-image-resize-left {
    left: -8px;
  }

  .tiptap-image-resize-right {
    right: -8px;
  }

  .tiptap-image-resize-handle::after {
    content: '';
    position: absolute;
    inset: 8px 4px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 3px;
  }

  &:hover .tiptap-image-resize-handle {
    opacity: 1;
    pointer-events: auto;
  }
`
