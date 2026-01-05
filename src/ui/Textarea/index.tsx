import React, { useCallback, useEffect, useRef } from 'react'
import { StyledTextarea } from './style'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = true, onChange, value, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null)
    const combinedRef = (node: HTMLTextAreaElement) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
      internalRef.current = node
    }

    const adjustHeight = useCallback(() => {
      const textarea = internalRef.current
      if (textarea && autoResize) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [autoResize])

    useEffect(() => {
      if (autoResize) {
        adjustHeight()
      }
    }, [value, adjustHeight, autoResize])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        adjustHeight()
      }
      onChange?.(e)
    }

    return (
      <StyledTextarea
        ref={combinedRef}
        className={className}
        onChange={handleChange}
        value={value}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
