import {
  arrow,
  autoPlacement,
  computePosition,
  flip,
  hide,
  inline,
  Middleware,
  offset,
  shift,
  size,
} from '@floating-ui/dom'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { columnResizingPluginKey, tableEditingKey } from '@tiptap/pm/tables'
import { EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/react'
import { FloatingUIOptionsProps } from './tableMenuHandlePlugin'

interface TableAddHandlePluginState {
  currentTablePos?: number
}

export interface TableAddHandlePluginProps {
  pluginKey: PluginKey<TableAddHandlePluginState>
  editor: Editor
  element: HTMLElement
  menuType: 'row' | 'column'
  options?: FloatingUIOptionsProps
}

export const rowAddPluginKey = new PluginKey<TableAddHandlePluginState>('table-row-add-handle')
export const columnAddPluginKey = new PluginKey<TableAddHandlePluginState>(
  'table-column-add-handle'
)

export const TableAddHandlePlugin = ({
  pluginKey,
  editor,
  element,
  menuType,
  options,
}: TableAddHandlePluginProps) => {
  const floatingUIOptions: NonNullable<FloatingUIOptionsProps> = options ?? {
    strategy: 'absolute',
    placement: 'top',
    offset: 0,
    flip: {},
    shift: {},
    arrow: false,
    size: false,
    autoPlacement: false,
    hide: false,
    inline: false,
  }

  const isRow = menuType === 'row'
  const middlewares: Middleware[] = []

  let ticking = false
  let isVisible = false
  let currentTablePos: number | undefined

  const getMiddlewares = () => {
    if (middlewares.length > 0) {
      return middlewares
    }

    if (floatingUIOptions.flip) {
      middlewares.push(
        flip(typeof floatingUIOptions.flip !== 'boolean' ? floatingUIOptions.flip : undefined)
      )
    }

    if (floatingUIOptions.shift) {
      middlewares.push(
        shift(typeof floatingUIOptions.shift !== 'boolean' ? floatingUIOptions.shift : undefined)
      )
    }

    if (floatingUIOptions.offset) {
      middlewares.push(
        offset(typeof floatingUIOptions.offset !== 'boolean' ? floatingUIOptions.offset : undefined)
      )
    }

    if (floatingUIOptions.arrow) {
      middlewares.push(arrow(floatingUIOptions.arrow))
    }

    if (floatingUIOptions.size) {
      middlewares.push(
        size(typeof floatingUIOptions.size !== 'boolean' ? floatingUIOptions.size : undefined)
      )
    }

    if (floatingUIOptions.autoPlacement) {
      middlewares.push(
        autoPlacement(
          typeof floatingUIOptions.autoPlacement !== 'boolean'
            ? floatingUIOptions.autoPlacement
            : undefined
        )
      )
    }

    if (floatingUIOptions.hide) {
      middlewares.push(
        hide(typeof floatingUIOptions.hide !== 'boolean' ? floatingUIOptions.hide : undefined)
      )
    }

    if (floatingUIOptions.inline) {
      middlewares.push(
        inline(typeof floatingUIOptions.inline !== 'boolean' ? floatingUIOptions.inline : undefined)
      )
    }

    return middlewares
  }

  const showMenu = (_view: EditorView, root: HTMLElement | null) => {
    if (isVisible) {
      return
    }

    element.style.visibility = 'visible'
    element.style.opacity = '1'
    root?.appendChild(element)

    floatingUIOptions.onShow?.()

    isVisible = true
  }

  const hideMenu = () => {
    if (!isVisible) {
      return
    }

    element.style.visibility = 'hidden'
    element.style.opacity = '0'
    // element.remove()

    floatingUIOptions.onHide?.()

    isVisible = false
    currentTablePos = undefined
  }

  const updatePosition = (view: EditorView, rect: DOMRect) => {
    const virtualElement = {
      getBoundingClientRect: () => rect,
      getClientRects: () => [rect],
    }

    computePosition(virtualElement, element, {
      placement: floatingUIOptions.placement,
      strategy: floatingUIOptions.strategy,
      middleware: getMiddlewares(),
    }).then(({ x, y, strategy }) => {
      if (isRow) {
        // Row add button appears at bottom, matches table width
        element.style.width = `${rect.width}px`
      } else {
        // Column add button appears at right, matches table height
        element.style.height = `${rect.height}px`
      }
      element.style.position = strategy
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      if (isVisible) {
        floatingUIOptions.onUpdate?.()
      }
    })
  }

  const handleMouseMove = (view: EditorView, evt: MouseEvent) => {
    const target = evt.target as Element
    if (!target) {
      return
    }

    if (columnResizingPluginKey.getState(view.state)?.dragging) {
      hideMenu()
      return
    }

    if (tableEditingKey.getState(view.state) !== null) {
      hideMenu()
      return
    }

    const pos = view.posAtDOM(target, 0)

    if (pos === undefined) {
      return
    }

    let tableNodePos: number | undefined = undefined

    view.state.doc.nodesBetween(pos, pos, (node, p) => {
      if (node.type.name === 'table') {
        tableNodePos = p
      }
      return true
    })

    if (tableNodePos === undefined) {
      hideMenu()
      return
    }

    const tableRoot = view.nodeDOM(tableNodePos)
    if (!tableRoot || !(tableRoot instanceof HTMLDivElement)) {
      hideMenu()
      return
    }

    const table = tableRoot.querySelector('table')
    if (!table) {
      return
    }

    const tableRect = table.getBoundingClientRect()
    // Detection area offset
    const offset = 20

    // Check if mouse is near the target edge
    // For Row (bottom add): mouse near bottom edge
    // For Column (right add): mouse near right edge
    let isNearEdge = false
    
    if (isRow) {
      // Near bottom edge
      if (
        evt.y >= tableRect.bottom - offset &&
        evt.y <= tableRect.bottom + offset &&
        evt.x >= tableRect.left &&
        evt.x <= tableRect.right
      ) {
        isNearEdge = true
      }
    } else {
      // Near right edge
      if (
        evt.x >= tableRect.right - offset &&
        evt.x <= tableRect.right + offset &&
        evt.y >= tableRect.top &&
        evt.y <= tableRect.bottom
      ) {
        isNearEdge = true
      }
    }

    if (!isNearEdge) {
      // Also check if mouse is over the handle itself if visible
      if (isVisible && element.contains(evt.target as Node)) {
        // Keep visible
        return
      }
      hideMenu()
      return
    }

    if (currentTablePos !== tableNodePos) {
      hideMenu()
    }
    currentTablePos = tableNodePos

    // Update plugin state with current table pos
    const tr = view.state.tr
    tr.setMeta(pluginKey, { currentTablePos: tableNodePos })
    view.dispatch(tr)

    // Update position
    updatePosition(view, tableRect)

    if (isVisible) {
      return
    }

    showMenu(view, tableRoot.querySelector('.table-controls'))
  }

  return new Plugin<TableAddHandlePluginState>({
    key: pluginKey,
    state: {
      init: () => ({}),
      apply: (tr, value) => {
        const meta = tr.getMeta(pluginKey)
        if (meta) {
          return { ...value, ...meta }
        }
        return value
      },
    },
    view: () => {
      return {
        update: (view, prevState) => {
          if (!prevState.doc.eq(view.state.doc)) {
            hideMenu()
          }
        },
        destroy: () => {
          hideMenu()
          floatingUIOptions.onDestroy?.()
        },
      }
    },
    props: {
      handleDOMEvents: {
        mousemove: (view, evt) => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              handleMouseMove(view, evt)
              ticking = false
            })
            ticking = true
          }
        },
        mouseleave: hideMenu,
      },
    },
  })
}
