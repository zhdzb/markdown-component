import styled, { css } from 'styled-components'

export const HandleContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 0.25rem;
  transition: opacity 0.2s;
  padding-right: 0.25rem;
  z-index: 50;
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: transparent;
  color: rgb(107 114 128); /* text-gray-500 */
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s;
  margin-right: 0.125rem;

  &:hover {
    background-color: rgb(229 231 235); /* bg-gray-200 */
    color: rgb(17 24 39); /* text-gray-900 */
  }

  .dark & {
    color: rgb(156 163 175); /* dark:text-gray-400 */

    &:hover {
      background-color: rgb(55 65 81); /* dark:bg-gray-700 */
      color: rgb(243 244 246); /* dark:text-gray-100 */
    }
  }
`

export const DragIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.5rem;
  color: rgb(156 163 175); /* text-gray-400 */
  cursor: grab;

  &:hover {
    color: rgb(75 85 99); /* text-gray-600 */
  }

  .dark & {
    color: rgb(107 114 128);

    &:hover {
      color: rgb(209 213 219);
    }
  }
`
export const SelectedNodeStyle = css`
  /* 选中节点高亮（拖拽句柄触发的 NodeSelection） */
  .tiptap.ProseMirror .ProseMirror-selectednode:not(img):not(pre):not(.react-renderer) {
    background-color: var(--selected-node-bg-color);
  }

  .tiptap.ProseMirror .ProseMirror-selectednode .tiptap-image .tiptap-image-container {
    outline: 0.125rem solid rgba(0, 0, 0, 0);
    outline-color: var(--selected-node-bd-color);
    border-radius: 0.25rem;
  }
`
