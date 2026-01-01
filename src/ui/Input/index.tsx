import * as React from 'react'
import { StyledInput } from './style'

function Input({ className, type, ...props }: React.ComponentProps<typeof StyledInput>) {
  return <StyledInput type={type} data-slot="input" className={className} {...props} />
}

export { Input }
