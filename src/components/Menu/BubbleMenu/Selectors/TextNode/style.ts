import styled from 'styled-components'

export const StyledPopoverItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem; /* text-sm */
  border-radius: 0.375rem; /* rounded-md */
  padding-left: 0.5rem; /* px-2 */
  padding-right: 0.5rem;
  padding-top: 0.375rem; /* py-1.5 */
  padding-bottom: 0.375rem;
  cursor: pointer;
  color: var(--accent-foreground);

  &:hover {
    background-color: var(--accent);
  }
`

export const StyledLabel = styled.span`
  white-space: nowrap;
  font-size: 0.875rem; /* text-sm */
  margin-right: 0.5rem; /* me-2 */
`

export const StyledSpacer = styled.div`
  flex: 1 1 0%;
`
