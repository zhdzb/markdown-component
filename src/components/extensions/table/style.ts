import { css } from 'styled-components'

export const StyledTable = css`
  .table {
    margin-bottom: 1rem;
    /* table-auto border-collapse w-full not-prose */
    table-layout: auto;
    border-collapse: collapse;
    width: 100%;
  }

  .table th {
    background-color: var(--muted);
    border: 1px solid var(--border);
    padding: 0.5rem;
    text-align: start;
    min-width: 150px;
    font-weight: 600;

    .dark & {
      background-color: #111827; /* dark:bg-gray-900 */
    }
  }

  .table td {
    border: 1px solid var(--border);
    padding: 0.5rem;
    min-width: 150px;
  }

  .tp-table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    padding: 1em;
    margin-left: -1rem;
    position: relative;
  }

  .tp-table-wrapper-no-scroll-y {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 1em 2em 2em 1em;
    margin-left: -1rem;
    position: relative;
  }

  .tiptap.ProseMirror th,
  .tiptap td {
    position: relative;
  }
  .tiptap.ProseMirror .column-resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    height: calc(100% + 2px);
    width: 3px;
    margin-inline-start: -1px;
    margin-top: -1px;
    background-color: var(--primary);
    cursor: col-resize;
    z-index: 1;
    pointer-events: auto;
  }
`
