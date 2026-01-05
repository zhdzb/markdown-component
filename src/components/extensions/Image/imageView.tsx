import { useCallback, useEffect, useRef, useState } from 'react'
import { NodeViewProps } from '@tiptap/core'
import { NodeViewWrapper } from '@tiptap/react'
import { StyledImageWrapper } from './style'

const MIN_WIDTH = 80
const FALLBACK_MAX_WIDTH = 600

const ImageView = ({ node, updateAttributes }: NodeViewProps) => {
  const { src, alt, title, width, align = 'center' } = node.attrs
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const maxWidthRef = useRef<number>(FALLBACK_MAX_WIDTH)
  const pendingWidthRef = useRef<number | null>(null)
  const initializedRef = useRef(false)
  const [currentWidth, setCurrentWidth] = useState<number | null>(width ?? null)

  useEffect(() => {
    setCurrentWidth(width ?? null)
  }, [width])

  const clampWidth = useCallback((rawWidth: number | null) => {
    if (!rawWidth) return null
    const availableWidth = wrapperRef.current?.getBoundingClientRect().width ?? maxWidthRef.current
    console.log('availableWidth', availableWidth)
    const maxAllowed = Math.min(maxWidthRef.current, availableWidth)
    return Math.max(MIN_WIDTH, Math.min(maxAllowed, Math.round(rawWidth)))
  }, [])

  const commitWidth = useCallback(
    (nextWidth: number | null) => {
      const safeWidth = clampWidth(nextWidth)
      if (!safeWidth) {
        return
      }

      setCurrentWidth(safeWidth)
      updateAttributes({ width: safeWidth })
    },
    [clampWidth, updateAttributes]
  )

  const startResize = useCallback(
    (direction: 'left' | 'right', event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      const rect = imageRef.current?.getBoundingClientRect()
      const availableWidth =
        wrapperRef.current?.getBoundingClientRect().width ?? maxWidthRef.current
      const startWidth = Math.min(rect?.width ?? currentWidth ?? width ?? MIN_WIDTH, availableWidth)
      const startX = event.clientX
      pendingWidthRef.current = startWidth

      const handleMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault()
        const delta = moveEvent.clientX - startX
        const rawWidth = direction === 'left' ? startWidth - delta : startWidth + delta
        const safeWidth = clampWidth(rawWidth)
        pendingWidthRef.current = safeWidth
        if (safeWidth) {
          setCurrentWidth(safeWidth)
        }
      }

      const handleUp = (upEvent: MouseEvent) => {
        upEvent.preventDefault()
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleUp)
        commitWidth(pendingWidthRef.current)
      }

      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleUp)
    },
    [clampWidth, commitWidth, currentWidth, width]
  )

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      if (initializedRef.current) {
        return
      }
      initializedRef.current = true

      const naturalWidth = event.currentTarget.naturalWidth || FALLBACK_MAX_WIDTH
      maxWidthRef.current = Math.max(MIN_WIDTH, naturalWidth)

      if (!width) {
        const displayedWidth = event.currentTarget.getBoundingClientRect().width
        const baseWidth = displayedWidth || naturalWidth
        commitWidth(clampWidth(baseWidth))
      } else {
        commitWidth(width)
      }
    },
    [clampWidth, commitWidth, width]
  )

  return (
    <StyledImageWrapper
      as={NodeViewWrapper}
      ref={wrapperRef}
      className="tiptap-image"
      data-align={align}
      data-width={currentWidth || ''}
      style={{ whiteSpace: 'normal' }}
    >
      <div className="tiptap-image-row">
        <div
          className="tiptap-image-container"
          style={currentWidth ? { width: `${currentWidth}px` } : undefined}
        >
          <div className="tiptap-image-content">
            <img
              ref={imageRef}
              src={src}
              alt={alt || title || ''}
              title={title}
              draggable={false}
              contentEditable={false}
              className="tiptap-image-img"
              onLoad={handleImageLoad}
            />
            <div
              className="tiptap-image-resize-handle tiptap-image-resize-left"
              onMouseDown={event => startResize('left', event)}
            />
            <div
              className="tiptap-image-resize-handle tiptap-image-resize-right"
              onMouseDown={event => startResize('right', event)}
            />
          </div>
        </div>
      </div>
    </StyledImageWrapper>
  )
}

export default ImageView
