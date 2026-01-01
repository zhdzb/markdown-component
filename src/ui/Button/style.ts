import styled, { css } from 'styled-components'

export const StyledButton = styled.button<{
  $variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  $size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* gap-2 */
  white-space: nowrap;
  border-radius: 0.375rem; /* rounded-md */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  outline: none;
  flex-shrink: 0;
  border: 1px solid transparent; /* Ensure border exists for layout stability */

  /* Disabled state */
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  /* SVG children styles */
  & > svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  & > svg:not([class*='size-']) {
    width: 1rem;
    height: 1rem; /* size-4 */
  }

  /* Focus visible */
  &:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px var(--ring);
  }

  /* Aria invalid */
  &[aria-invalid='true'] {
    border-color: var(--destructive);
    box-shadow: 0 0 0 1px var(--destructive);
  }

  /* Dark mode aria invalid adjustment */
  .dark &[aria-invalid='true'] {
    box-shadow: 0 0 0 1px var(--destructive);
  }

  /* Variants */
  ${({ $variant = 'default' }) => {
    switch ($variant) {
      case 'destructive':
        return css`
          background-color: var(--destructive);
          color: var(--destructive-foreground);
          &:hover {
            background-color: var(--destructive);
          }
          /* Dark mode specific for destructive */
          .dark & {
            background-color: var(--destructive);
          }
          .dark &:focus-visible {
            box-shadow: 0 0 0 3px var(--destructive);
          }
        `
      case 'outline':
        return css`
          border-color: var(--input);
          background-color: var(--background);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          &:hover {
            background-color: var(--accent);
            color: var(--accent-foreground);
          }
          .dark & {
            background-color: var(--input);
            border-color: var(--input);
          }
          .dark &:hover {
            background-color: var(--input);
          }
        `
      case 'secondary':
        return css`
          background-color: var(--secondary);
          color: var(--secondary-foreground);
          &:hover {
            background-color: var(--secondary);
          }
        `
      case 'ghost':
        return css`
          background-color: transparent;
          border-color: transparent;
          &:hover {
            background-color: var(--accent);
            color: var(--accent-foreground);
          }
          .dark &:hover {
            background-color: var(--accent);
          }
        `
      case 'link':
        return css`
          background-color: transparent;
          border-color: transparent;
          color: var(--primary);
          text-underline-offset: 4px;
          &:hover {
            text-decoration: underline;
          }
        `
      default: // 'default'
        return css`
          background-color: var(--primary);
          color: var(--primary-foreground);
          &:hover {
            background-color: var(--primary);
          }
        `
    }
  }}

  /* Sizes */
  ${({ $size = 'default' }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 2rem; /* h-8 */
          border-radius: 0.375rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          gap: 0.375rem;

          &:has(> svg) {
            padding-left: 0.625rem; /* px-2.5 */
            padding-right: 0.625rem;
          }
        `
      case 'lg':
        return css`
          height: 2.5rem; /* h-10 */
          border-radius: 0.375rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;

          &:has(> svg) {
            padding-left: 1rem; /* px-4 */
            padding-right: 1rem;
          }
        `
      case 'icon':
        return css`
          height: 2.25rem; /* size-9 */
          width: 2.25rem;
          padding: 0;
        `
      case 'icon-sm':
        return css`
          height: 2rem; /* size-8 */
          width: 2rem;
          padding: 0;
        `
      case 'icon-lg':
        return css`
          height: 2.5rem; /* size-10 */
          width: 2.5rem;
          padding: 0;
        `
      default: // 'default'
        return css`
          height: 2.25rem; /* h-9 */
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;

          &:has(> svg) {
            padding-left: 0.75rem; /* px-3 */
            padding-right: 0.75rem;
          }
        `
    }
  }}
`
