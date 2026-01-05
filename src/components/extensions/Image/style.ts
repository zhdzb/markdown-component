import styled, { css } from 'styled-components'
import { NodeViewWrapper } from '@tiptap/react'

export const StyledImageWrapper = styled(NodeViewWrapper)`
  width: 100%;
  display: block;
  margin: 0.75rem 0;
  position: relative;

  &[data-align='left'] .tiptap-image-container {
    margin-left: 0;
    margin-right: auto;
  }

  &[data-align='center'] .tiptap-image-container {
    margin-left: auto;
    margin-right: auto;
  }

  &[data-align='right'] .tiptap-image-container {
    margin-left: auto;
    margin-right: 0;
  }

  .tiptap-image-row {
    width: 100%;
  }

  .tiptap-image-container {
    margin: 0 auto;
    max-width: 100%;
  }

  .tiptap-image-content {
    position: relative;
    /* display: inline-block; */
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

  .tiptap-image-menu {
    position: fixed;
    z-index: 1100;
    transform: translate(-50%, -0.5rem);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 120ms ease,
      transform 120ms ease;
  }

  .tiptap-image-menu[data-placement='bottom'] {
    transform: translate(-50%, 0.5rem);
  }
`

export const StyledImageGlobalStyle = css`
  .tiptap.ProseMirror .node-customImage.ProseMirror-selectednode .tiptap-image-menu {
    opacity: 1;
    pointer-events: auto;
  }
`

export const StyledImageMenu = styled.div`
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  align-items: center;
`

export const StyledImageMenuContent = styled.div`
  display: flex;
  height: 2.25rem;
  max-width: 90vw;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  background-color: var(--popover);
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  overflow: hidden;
  pointer-events: auto;
`
