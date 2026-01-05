import { useCallback, useEffect, useRef, useState } from 'react'
import { Editor } from '@tiptap/core'

const MENU_HEIGHT = 36
const MENU_GAP = 8
const SCROLL_DEBOUNCE_DELAY = 150

export interface MenuPosition {
  left: number
  top: number
  placement: 'top' | 'bottom'
}

export interface UseImageMenuOptions {
  wrapperRef: React.RefObject<HTMLDivElement>
  selected: boolean
  align: 'left' | 'center' | 'right'
  currentWidth: number | null
  editor: Editor | null
  src: string
  alt?: string
  title?: string
  updateAttributes: (attrs: { align?: 'left' | 'center' | 'right' }) => void
}

export const useImageMenu = ({
  wrapperRef,
  selected,
  align,
  currentWidth,
  editor,
  src,
  alt,
  title,
  updateAttributes,
}: UseImageMenuOptions) => {
  const scrollDebounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null)

  const updateMenuPosition = useCallback(() => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) {
      return
    }
    const hasRoomAbove = rect.top >= MENU_HEIGHT + MENU_GAP
    const placement: 'top' | 'bottom' = hasRoomAbove ? 'top' : 'bottom'
    const top = placement === 'top' ? rect.top - MENU_GAP : rect.bottom + MENU_GAP
    const left = rect.left + rect.width / 2
    setMenuPosition({ left, top, placement })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 处理选中状态变化和滚动/resize事件
  useEffect(() => {
    if (!selected) {
      setMenuPosition(null)
      return
    }

    updateMenuPosition()

    const handleScroll = () => {
      // 滚动时隐藏菜单
      setMenuPosition(null)

      // 清除之前的防抖定时器
      if (scrollDebounceTimerRef.current) {
        clearTimeout(scrollDebounceTimerRef.current)
      }

      // 设置新的防抖定时器
      scrollDebounceTimerRef.current = setTimeout(() => {
        updateMenuPosition()
      }, SCROLL_DEBOUNCE_DELAY)
    }

    const handleResize = () => {
      updateMenuPosition()
    }

    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleResize)
      if (scrollDebounceTimerRef.current) {
        clearTimeout(scrollDebounceTimerRef.current)
      }
    }
  }, [selected, updateMenuPosition])

  // 当宽度或对齐方式变化时更新菜单位置
  useEffect(() => {
    if (selected) {
      updateMenuPosition()
    }
  }, [selected, currentWidth, align, updateMenuPosition])

  const handleAlignChange = useCallback(
    (nextAlign: 'left' | 'center' | 'right') => {
      updateAttributes({ align: nextAlign })
      updateMenuPosition()
    },
    [updateAttributes, updateMenuPosition]
  )

  const handleDownload = useCallback(() => {
    if (!src) return
    const link = document.createElement('a')
    link.href = src
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.download = title || alt || 'image'
    link.click()
  }, [src, title, alt])

  const handleDelete = useCallback(() => {
    if (!editor) return
    editor.chain().focus().deleteSelection().run()
  }, [editor])

  return {
    menuPosition,
    handleAlignChange,
    handleDownload,
    handleDelete,
  }
}
