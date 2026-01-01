import styled from 'styled-components'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

export const StyledSeparator = styled(SeparatorPrimitive.Root)`
  background-color: var(--border);
  flex-shrink: 0;

  &[data-orientation='horizontal'] {
    height: 1px;
    width: 100%;
  }

  &[data-orientation='vertical'] {
    height: 100%;
    width: 1px;
  }
`
