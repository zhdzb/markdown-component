import styled from 'styled-components'
import { DropdownMenuContent, DropdownMenuItem } from '@/ui/DropdownMenu'

export const StyledBlockMenuContent = styled(DropdownMenuContent)`
  min-width: 12rem;
  max-height: 20rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover,
  &:focus {
    color: var(--destructive);
    background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
  }
`

export const StyledShortcut = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--muted-foreground);
  letter-spacing: 0.05em;
`
