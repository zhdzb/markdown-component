import { Editor, useEditorState } from '@tiptap/react'
import { CellSelection } from '@tiptap/pm/tables'
import { TextSelection } from '@tiptap/pm/state'

export interface TableSelectionState {
  canMergeCell: boolean
  canSplitCell: boolean
  canClearContents: boolean
}

export const useTableSelectionState = (editor: Editor): TableSelectionState => {
  return useEditorState<TableSelectionState>({
    editor,
    equalityFn: (a, b) => {
      return (
        a.canMergeCell === b?.canMergeCell &&
        a.canSplitCell === b?.canSplitCell &&
        a.canClearContents === b?.canClearContents
      )
    },
    selector: ctx => {
      const { selection } = ctx.editor.state
      const { from, to, ranges } = selection

      if (!ctx.editor.isActive('table')) {
        return {
          canMergeCell: false,
          canSplitCell: false,
          canClearContents: false,
        }
      }

      let hasSpannedCell = false
      let cellSelectionCount = 0
      let selectionContentSize = 0

      // Handle TextSelection (single cell focused or text selected within cell)
      if (selection instanceof TextSelection) {
        ctx.editor.state.doc.nodesBetween(from, to, (node, pos) => {
          const nodeName = node.type.name
          if (nodeName === 'tableHeader' || nodeName === 'tableCell') {
            const cell = ctx.editor.view.nodeDOM(pos) as HTMLTableCellElement
            if (cell) {
              hasSpannedCell = cell.colSpan > 1 || cell.rowSpan > 1
            }
            // Check content size for this cell
            selectionContentSize += node.content.size
            return false // Don't traverse into cell content for spanning check
          }
          return true
        })
      }

      // Handle CellSelection (multiple cells selected)
      if (selection instanceof CellSelection) {
        cellSelectionCount = selection.ranges.length
        for (const range of ranges) {
          const { $from, $to } = range
          ctx.editor.state.doc.nodesBetween($from.pos, $to.pos, node => {
            if (node.isTextblock) {
              selectionContentSize += node.content.size
            }
            return true
          })
        }
      }

      return {
        canMergeCell: cellSelectionCount > 1,
        canSplitCell: hasSpannedCell,
        canClearContents: selectionContentSize > 0,
      }
    },
  })
}
