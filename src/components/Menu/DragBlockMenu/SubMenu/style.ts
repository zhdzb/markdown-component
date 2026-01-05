import styled from 'styled-components'
import {
  DropdownMenuSubTrigger,
  DropdownMenuItem,
} from '@/ui/DropdownMenu'

export const StyledTurnIntoTrigger = styled(DropdownMenuSubTrigger)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const StyledTurnIntoItem = styled(DropdownMenuItem)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const StyledTurnIntoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
`

export const StyledTurnIntoName = styled.span`
  flex: 1;
`

export const StyledTurnIntoSpacer = styled.div`
  flex: 1 1 0%;
`

export const StyledTurnIntoCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-left: 1rem;
`

export const StyledColorTrigger = styled(DropdownMenuSubTrigger)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const StyledColorItem = styled(DropdownMenuItem)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const StyledColorPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
`
