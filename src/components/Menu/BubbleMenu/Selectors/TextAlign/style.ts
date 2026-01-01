import styled from 'styled-components'

export const StyledAlignItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space-x-2 */
  border-radius: 0.375rem; /* rounded-md */
  padding: 0.375rem 0.5rem; /* px-2 py-1.5 */
  color: hsl(var(--accent-foreground));
  cursor: pointer;

  &:hover {
    background-color: hsl(var(--accent));
  }
`

export const StyledTitle = styled.span`
  font-size: 0.875rem; /* text-sm */
`

export const StyledSpacer = styled.div`
  flex: 1 1 0%;
`
