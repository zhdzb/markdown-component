import styled from 'styled-components'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

export const StyledScrollAreaRoot = styled(ScrollAreaPrimitive.Root)`
  position: relative;
`

export const StyledViewport = styled(ScrollAreaPrimitive.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transition-property: color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--ring);
    outline-width: 1px;
    outline-style: solid;
    outline-color: transparent;
  }
`

export const StyledScrollbar = styled(ScrollAreaPrimitive.ScrollAreaScrollbar)`
  display: flex;
  touch-action: none;
  padding: 1px;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  user-select: none;

  &[data-orientation='vertical'] {
    height: 100%;
    width: 0.625rem;
    border-left: 1px solid transparent;
  }

  &[data-orientation='horizontal'] {
    height: 0.625rem;
    flex-direction: column;
    border-top: 1px solid transparent;
  }
`

export const StyledThumb = styled(ScrollAreaPrimitive.ScrollAreaThumb)`
  background-color: var(--border);
  position: relative;
  flex: 1 1 0%;
  border-radius: 9999px;
`
