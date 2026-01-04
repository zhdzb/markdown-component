import styled from 'styled-components'
export const StyledTextPreview = styled.span`
  font-size: 1rem;
  font-weight: 500;
`

export const StyledHighlightPreview = styled.div<{ $hasBorder?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  position: relative;
  ${props => props.$hasBorder && 'border: 1px solid #e5e7eb;'}

  .no-color-line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 100%;
    height: 1px;
    background-color: #ef4444;
  }
`
