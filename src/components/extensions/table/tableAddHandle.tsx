import { useEffect, useRef } from 'react'
import { TableAddHandlePlugin, TableAddHandlePluginProps } from './plugins/tableAddHandlePlugin'
import { createPortal } from 'react-dom'

export interface TableAddHandleProps {
  ref?: React.ForwardedRef<HTMLDivElement>
  pluginProps: Omit<TableAddHandlePluginProps, 'element'>
  children: React.ReactNode
}

export function TableAddHandle({ ref, children, pluginProps }: TableAddHandleProps) {
  const rootElementRef = useRef(document.createElement('div'))

  useEffect(() => {
    if (typeof ref === 'function') {
      ref(rootElementRef.current)
    } else if (ref) {
      ref.current = rootElementRef.current
    }
  }, [ref])

  useEffect(() => {
    const editor = pluginProps.editor
    const rootElement = rootElementRef.current

    rootElement.style.visibility = 'hidden'
    rootElement.style.position = 'absolute'
    // Ensure pointer events are enabled so click works
    rootElement.style.pointerEvents = 'auto'
    rootElement.style.zIndex = '50'
    // Prevent focus stealing
    rootElement.onmousedown = (e) => e.preventDefault()

    if (editor.isDestroyed) {
      return
    }

    const plugin = TableAddHandlePlugin({
      ...pluginProps,
      element: rootElement,
    })

    editor.registerPlugin(plugin)

    return () => {
      editor.unregisterPlugin(pluginProps.pluginKey)
      window.requestAnimationFrame(() => {
        if (rootElement.parentNode) {
          rootElement.parentNode.removeChild(rootElement)
        }
      })
    }
  }, [pluginProps])

  return createPortal(<>{children}</>, rootElementRef.current)
}
