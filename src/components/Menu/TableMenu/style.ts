import styled from 'styled-components'
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../../ui/DropdownMenu'

export const StyledColumnMenuTrigger = styled(DropdownMenuTrigger)<{ $opened?: boolean }>`
  width: 100%;
  height: 0.75rem;
  border-radius: calc(var(--radius) - 2px);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $opened }) =>
    $opened
      ? `
    background-color: var(--primary);
    color: var(--primary-foreground);
  `
      : `
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    
    &:hover {
      background-color: color-mix(in srgb, var(--secondary) 70%, transparent);
    }
  `}
`

export const StyledRowMenuTrigger = styled(DropdownMenuTrigger)<{ $opened?: boolean }>`
  width: 0.75rem;
  border-radius: calc(var(--radius) - 2px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  ${({ $opened }) =>
    $opened
      ? `
    background-color: var(--primary);
    color: var(--primary-foreground);
  `
      : `
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    
    &:hover {
      background-color: color-mix(in srgb, var(--secondary) 70%, transparent);
    }
  `}
`

export const StyledCellMenuTrigger = styled(DropdownMenuTrigger)<{ $opened?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--primary);
  border-radius: 9999px;
  cursor: pointer;
  pointer-events: auto;

  ${({ $opened }) =>
    $opened
      ? `
    width: 1rem;
    height: 1rem;
    right: -0.5625rem;
  `
      : `
    width: 0.5rem;
    height: 0.5rem;
    right: -0.3125rem;
  `}

  &:hover {
    right: -0.5625rem;
    width: 1rem;
    height: 1rem;
  }
`

export const StyledTableMenuContent = styled(DropdownMenuContent)`
  max-height: 20rem;
  width: 10rem;
  overflow: hidden;
  overflow-y: auto;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid var(--border);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

export const StyledDestructiveMenuItem = styled(DropdownMenuItem)`
  color: var(--destructive);

  &:hover {
    color: var(--destructive);
  }

  &:focus {
    color: var(--destructive);
  }
`
