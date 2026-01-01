import styled, { keyframes } from 'styled-components'
import * as PopoverPrimitive from '@radix-ui/react-popover'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const zoomIn = keyframes`
  from { transform: scale(0.95); }
  to { transform: scale(1); }
`

const zoomOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.95); }
`

const slideInFromTop = keyframes`
  from { transform: translateY(-0.5rem); }
  to { transform: translateY(0); }
`

const slideInFromBottom = keyframes`
  from { transform: translateY(0.5rem); }
  to { transform: translateY(0); }
`

const slideInFromLeft = keyframes`
  from { transform: translateX(-0.5rem); }
  to { transform: translateX(0); }
`

const slideInFromRight = keyframes`
  from { transform: translateX(0.5rem); }
  to { transform: translateX(0); }
`

export const StyledPopoverContent = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 18rem; /* w-72 */
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid var(--border);
  background-color: var(--popover);
  color: var(--popover-foreground);
  padding: 1rem; /* p-4 */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
  outline: none;
  transform-origin: var(--radix-popover-content-transform-origin);

  &[data-state='open'] {
    animation:
      ${fadeIn} 0.2s ease-out,
      ${zoomIn} 0.2s ease-out;
  }

  &[data-state='closed'] {
    animation:
      ${fadeOut} 0.2s ease-in,
      ${zoomOut} 0.2s ease-in;
  }

  &[data-side='bottom'] {
    animation-name: ${slideInFromTop}, ${fadeIn}, ${zoomIn};
  }

  &[data-side='left'] {
    animation-name: ${slideInFromRight}, ${fadeIn}, ${zoomIn};
  }

  &[data-side='right'] {
    animation-name: ${slideInFromLeft}, ${fadeIn}, ${zoomIn};
  }

  &[data-side='top'] {
    animation-name: ${slideInFromBottom}, ${fadeIn}, ${zoomIn};
  }
`
