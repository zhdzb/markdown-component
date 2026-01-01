import styled from 'styled-components'

export const StyledColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* space-y-3 */
  padding: 0.5rem;
`

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const StyledSectionTitle = styled.span`
  font-size: 0.75rem; /* text-xs */
  font-weight: 500;
  color: #6b7280; /* text-gray-500 */
  padding-left: 0.25rem;
`

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
`

export const StyledColorButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem; /* w-7 */
  height: 1.75rem; /* h-7 */
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid transparent;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
  `}
`
