import styled from 'styled-components'

export const StyledInput = styled.input`
  display: flex;
  height: 2.25rem; /* h-9 */
  width: 100%;
  min-width: 0;
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid hsl(var(--input));
  background-color: transparent;
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  font-size: 1rem; /* text-base */
  transition-property: color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  outline: none;

  @media (min-width: 768px) {
    font-size: 0.875rem; /* md:text-sm */
  }

  &::file-selector-button {
    border: 0;
    background-color: transparent;
    font-size: 0.875rem; /* text-sm */
    font-weight: 500; /* font-medium */
    color: hsl(var(--foreground));
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &::selection {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }

  .dark & {
    background-color: hsl(var(--input) / 0.3);
  }

  &:focus-visible {
    border-color: hsl(var(--ring));
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[aria-invalid='true'] {
    border-color: hsl(var(--destructive));
    box-shadow: 0 0 0 1px hsl(var(--destructive) / 0.2);

    .dark & {
      box-shadow: 0 0 0 1px hsl(var(--destructive) / 0.4);
    }
  }
`
