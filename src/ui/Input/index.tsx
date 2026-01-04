import * as React from 'react'
import { StyledInput } from './style'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof StyledInput>>(
  ({ className, type, ...props }, ref) => {
    return <StyledInput ref={ref} type={type} data-slot="input" className={className} {...props} />
  }
)
Input.displayName = 'Input'

export { Input }
