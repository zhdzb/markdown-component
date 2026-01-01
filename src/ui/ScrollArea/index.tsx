import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { StyledScrollAreaRoot, StyledViewport, StyledScrollbar, StyledThumb } from './style'

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof StyledScrollAreaRoot>) {
  return (
    <StyledScrollAreaRoot data-slot="scroll-area" className={className} {...props}>
      <StyledViewport data-slot="scroll-area-viewport">{children}</StyledViewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </StyledScrollAreaRoot>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof StyledScrollbar>) {
  return (
    <StyledScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={className}
      {...props}
    >
      <StyledThumb data-slot="scroll-area-thumb" />
    </StyledScrollbar>
  )
}

export { ScrollArea, ScrollBar }
