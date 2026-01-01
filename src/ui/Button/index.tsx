import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { StyledButton } from './style'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    return (
      <StyledButton
        as={asChild ? Slot : 'button'}
        ref={ref}
        $variant={variant}
        $size={size}
        className={className}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
