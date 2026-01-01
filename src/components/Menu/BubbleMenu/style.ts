import styled from 'styled-components'
import { ScrollArea } from '@/ui/ScrollArea'

export const StyledMenuScrollArea = styled(ScrollArea)`
  max-width: 90vw;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  background-color: var(--popover);
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
`

export const StyledMenuContent = styled.div`
  display: flex;
  height: 2.25rem;
`
