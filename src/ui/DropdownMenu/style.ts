import styled from 'styled-components'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const StyledDropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)<{
  $inset?: boolean
}>`
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  gap: 0.5rem;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: background-color 0.15s;

  &:focus {
    background-color: var(--accent);
  }

  &[data-state='open'] {
    background-color: var(--accent);
  }

  svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  ${({ $inset }) =>
    $inset &&
    `
    padding-left: 2rem;
  `}
`

// 共享的动画 keyframes
const dropdownMenuAnimations = `
  @keyframes dropdownMenuFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dropdownMenuFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes dropdownMenuZoomIn {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes dropdownMenuZoomOut {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.95);
    }
  }

  @keyframes dropdownMenuSlideInFromTop {
    from {
      transform: translateY(-0.5rem);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes dropdownMenuSlideInFromRight {
    from {
      transform: translateX(0.5rem);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes dropdownMenuSlideInFromLeft {
    from {
      transform: translateX(-0.5rem);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes dropdownMenuSlideInFromBottom {
    from {
      transform: translateY(0.5rem);
    }
    to {
      transform: translateY(0);
    }
  }
`

export const StyledDropdownMenuSubContent = styled(DropdownMenuPrimitive.SubContent)`
  ${dropdownMenuAnimations}

  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: calc(var(--radius) - 4px);
  border: 1px solid var(--border);
  background-color: var(--popover);
  color: var(--popover-foreground);
  padding: 0.25rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

  &[data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out;
  }

  &[data-state='closed'] {
    animation:
      dropdownMenuFadeOut 150ms ease-in,
      dropdownMenuZoomOut 150ms ease-in;
  }

  &[data-side='bottom'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromTop 150ms ease-out;
  }

  &[data-side='left'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromRight 150ms ease-out;
  }

  &[data-side='right'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromLeft 150ms ease-out;
  }

  &[data-side='top'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromBottom 150ms ease-out;
  }
`

export const StyledDropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  ${dropdownMenuAnimations}

  z-index: 50;
  max-height: var(--radix-dropdown-menu-content-available-height);
  min-width: 8rem;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: calc(var(--radius) - 4px);
  border: 1px solid var(--border);
  background-color: var(--popover);
  padding: 0.25rem;
  color: var(--popover-foreground);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);

  &[data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out;
  }

  &[data-state='closed'] {
    animation:
      dropdownMenuFadeOut 150ms ease-in,
      dropdownMenuZoomOut 150ms ease-in;
  }

  &[data-side='bottom'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromTop 150ms ease-out;
  }

  &[data-side='left'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromRight 150ms ease-out;
  }

  &[data-side='right'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromLeft 150ms ease-out;
  }

  &[data-side='top'][data-state='open'] {
    animation:
      dropdownMenuFadeIn 150ms ease-out,
      dropdownMenuZoomIn 150ms ease-out,
      dropdownMenuSlideInFromBottom 150ms ease-out;
  }
`

export const StyledDropdownMenuItem = styled(DropdownMenuPrimitive.Item)<{ $inset?: boolean }>`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  gap: 0.5rem;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition-property: background-color, color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  ${({ $inset }) =>
    $inset &&
    `
    padding-left: 2rem;
  `}
`

export const StyledDropdownMenuCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
  transition-property: background-color, color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  > span {
    position: absolute;
    left: 0.5rem;
    display: flex;
    height: 0.875rem;
    width: 0.875rem;
    align-items: center;
    justify-content: center;
  }
`

export const StyledDropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
  transition-property: background-color, color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  > span {
    position: absolute;
    left: 0.5rem;
    display: flex;
    height: 0.875rem;
    width: 0.875rem;
    align-items: center;
    justify-content: center;
  }
`

export const StyledDropdownMenuLabel = styled(DropdownMenuPrimitive.Label)<{ $inset?: boolean }>`
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;

  ${({ $inset }) =>
    $inset &&
    `
    padding-left: 2rem;
  `}
`

export const StyledDropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator)`
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: var(--muted);
`

export const StyledDropdownMenuShortcut = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  opacity: 0.6;
`
