import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { StyledSeparator } from './style'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof StyledSeparator>) {
  return (
    <StyledSeparator
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={className}
      {...props}
    />
  )
}

export { Separator }
