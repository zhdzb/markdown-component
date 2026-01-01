import styled from 'styled-components'
import { NodeViewWrapper } from '@tiptap/react'

export const StyledCodeBlockWrapper = styled(NodeViewWrapper)`
  .code-container {
    display: flex;
    background-color: rgb(247 247 247) !important; /* !bg-gray-800 */
    color: rgb(53 54 57); /* text-gray-200 */
    overflow-x: auto;
    border-radius: 0.25rem; /* rounded */
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace; /* font-mono */
    font-weight: 500; /* font-medium */
    font-size: 15px; /* text-[15px] */
    line-height: 1.5;

    .dark & {
      background-color: rgb(17 24 39) !important; /* dark:!bg-gray-900 */
    }
  }

  pre {
    padding: 0.75rem; /* p-3 */
    padding-inline-start: 0; /* ps-0 */
    margin: 0;
  }

  .node-view-content {
    white-space: pre !important; /* !text-nowrap -> pre */
    min-width: 0.25rem; /* min-w-1 */
  }
`
