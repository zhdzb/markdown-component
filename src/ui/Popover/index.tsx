import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { StyledPopoverContent } from './style'

type PortalProps = React.ComponentProps<typeof PopoverPrimitive.Portal>

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  noPortal,
  portalProps,
  ...props
}: React.ComponentProps<typeof StyledPopoverContent> & {
  noPortal?: boolean
  portalProps?: PortalProps
}) {
  const content = (
    <StyledPopoverContent
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={className}
      {...props}
    />
  )

  if (noPortal) {
    return content
  }
  return <PopoverPrimitive.Portal {...portalProps}>{content}</PopoverPrimitive.Portal>
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
