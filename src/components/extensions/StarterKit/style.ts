import { css } from 'styled-components'

export const StyledStarterKit = css`
  .tp-bullet-list {
    list-style-type: disc;
    list-style-position: outside;
    margin-left: 1em;
    line-height: 0.75rem; /* leading-3 */
    margin-top: -0.5rem; -mt-2
  }

  .tp-ordered-list {
    list-style-type: decimal;
    list-style-position: outside;
    margin-left: 1em;
    line-height: 0.75rem; /* leading-3 */
    margin-top: -0.5rem; /* -mt-2 */
  }

  .tp-list-item {
    line-height: 1.5; /* leading-normal */
    margin-bottom: -0.5rem; /* -mb-2 */
  }

  .tp-block-quote {
    border-left-width: 4px; /* border-l-4 */
    border-color: #4b5563; /* border-gray-600 */
    border-style: solid;
  }

  .tp-code-block {
    border-radius: 0.5rem; /* rounded-lg */
    background-color: var(--muted); /* bg-muted */
    color: #b91c1c; /* text-red-700 */
    padding: 0.25rem 0.375rem; /* py-1 px-1.5 */
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace; /* font-mono */
    font-weight: 500; /* font-medium */

    &::before {
      content: none;
    }
    &::after {
      content: none;
    }

    /* dark:bg-muted/90 dark:text-red-400 */
    .dark & {
      background-color: color-mix(in srgb, var(--muted), transparent 10%);
      color: #f87171;
    }
  }

  .tp-horizontal-rule {
    margin-top: 1rem;
    margin-bottom: 1rem; /* my-4 */
    background-color: var(--border); /* bg-border */
    border-color: var(--border); /* border-border */
    border-width: 1px;
    height: 1px;
    border-style: solid;
  }

  .tp-link {
    color: var(--foreground) !important; /* !text-foreground */
    text-decoration-line: underline; /* underline */
    text-underline-offset: 3px; /* underline-offset-[3px] */
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms; /* transition-colors */
    cursor: pointer; /* cursor-pointer */
  }
`
