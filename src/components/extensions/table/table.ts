import { createColGroup, Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'
import { DOMOutputSpec, DOMSerializer } from '@tiptap/pm/model'
import { mergeAttributes } from '@tiptap/react'
import type { Command } from '@tiptap/core'
import { moveColumn, moveRow } from './utils'

export const CustomTable = Table.extend({
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(node, this.options.cellMinWidth)

    const table: DOMOutputSpec = [
      'div',
      {
        class: 'tp-table-wrapper',
      },
      [
        'table',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: tableWidth ? `width: ${tableWidth}` : `min-width: ${tableMinWidth}`,
        }),
        colgroup,
        ['tbody', 0],
      ],
    ]

    return table
  },

  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const { colgroup, tableWidth, tableMinWidth } = createColGroup(
        node,
        this.options.cellMinWidth
      )

      const dom = document.createElement('div')
      dom.setAttribute('data-content-type', 'table')
      dom.className = 'table'
      const wrapper = document.createElement('div')
      wrapper.className = 'tp-table-wrapper tp-table-wrapper-no-scroll-y'

      const tableContainer = document.createElement('div')
      tableContainer.className = 'table-container'

      const table = document.createElement('table')
      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        table.setAttribute(key, value)
      })

      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        table.setAttribute(key, value)
      })
      table.style.width = tableWidth
      table.style.minWidth = tableMinWidth

      const colGroup = DOMSerializer.renderSpec(document, colgroup)

      const content = document.createElement('tbody')

      table.append(colGroup.dom, content)

      tableContainer.append(table)

      const tableControls = document.createElement('div')
      tableControls.className = 'table-controls'

      const tableSelectionContainer = document.createElement('div')
      tableSelectionContainer.className = 'table-selection-container'

      wrapper.append(tableContainer, tableControls, tableSelectionContainer)

      dom.append(wrapper)

      return {
        dom: dom,
        contentDOM: content,
        ignoreMutation: _mutation => {
          return true
        },
      }
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      moveColumnLeft:
        (): Command =>
        ({ state, dispatch }) =>
          moveColumn(state, dispatch, 'left'),
      moveColumnRight:
        (): Command =>
        ({ state, dispatch }) =>
          moveColumn(state, dispatch, 'right'),
      moveRowUp:
        (): Command =>
        ({ state, dispatch }) =>
          moveRow(state, dispatch, 'up'),
      moveRowDown:
        (): Command =>
        ({ state, dispatch }) =>
          moveRow(state, dispatch, 'down'),
    }
  },
})

export const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      verticalAlign: {
        default: null,
        parseHTML: element => element.style.verticalAlign,
        renderHTML: attributes => {
          if (!attributes.verticalAlign) return {}
          return { style: `vertical-align: ${attributes.verticalAlign}` }
        },
      },
      horizontalAlign: {
        default: null,
        parseHTML: element => element.style.textAlign,
        renderHTML: attributes => {
          if (!attributes.horizontalAlign) return {}
          return { style: `text-align: ${attributes.horizontalAlign}` }
        },
      },
    }
  },
}).configure({
  HTMLAttributes: {},
})

export const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      verticalAlign: {
        default: null,
        parseHTML: element => element.style.verticalAlign,
        renderHTML: attributes => {
          if (!attributes.verticalAlign) return {}
          return { style: `vertical-align: ${attributes.verticalAlign}` }
        },
      },
      horizontalAlign: {
        default: null,
        parseHTML: element => element.style.textAlign,
        renderHTML: attributes => {
          if (!attributes.horizontalAlign) return {}
          return { style: `text-align: ${attributes.horizontalAlign}` }
        },
      },
    }
  },
}).configure({
  HTMLAttributes: {},
})

export const CustomTableRow = TableRow.configure({
  HTMLAttributes: {},
})
