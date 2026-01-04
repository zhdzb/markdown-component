import { Editor } from '@tiptap/react'
import { TableMap, CellSelection } from '@tiptap/pm/tables'
import { findParentNode } from '@tiptap/core'
import { TextSelection, type EditorState, type Transaction } from '@tiptap/pm/state'
import type { Node as ProseMirrorNode } from '@tiptap/pm/model'

/**
 * 移动列的方向
 */
export type MoveColumnDirection = 'left' | 'right'

/**
 * 移动行的方向
 */
export type MoveRowDirection = 'up' | 'down'

/**
 * 获取当前单元格和表格信息
 */
function getCellAndTable(selection: any) {
  const cell = findParentNode(
    (node: ProseMirrorNode) => node.type.name === 'tableCell' || node.type.name === 'tableHeader'
  )(selection)

  if (!cell) {
    return null
  }

  const table = findParentNode((node: ProseMirrorNode) => node.type.name === 'table')(selection)
  if (!table) {
    return null
  }

  return { cell, table }
}

/**
 * 获取当前单元格的列索引
 */
function getColumnIndex(cell: { pos: number }, table: { pos: number; node: ProseMirrorNode }) {
  const tableMap = TableMap.get(table.node)
  const tableStart = table.pos + 1
  const cellOffset = cell.pos - tableStart

  for (let i = 0; i < tableMap.map.length; i++) {
    if (tableMap.map[i] === cellOffset) {
      return i % tableMap.width
    }
  }

  return -1
}

/**
 * 获取当前单元格的行索引
 */
function getRowIndex(cell: { pos: number }, table: { pos: number; node: ProseMirrorNode }) {
  const tableMap = TableMap.get(table.node)
  const tableStart = table.pos + 1
  const cellOffset = cell.pos - tableStart

  for (let i = 0; i < tableMap.map.length; i++) {
    if (tableMap.map[i] === cellOffset) {
      return Math.floor(i / tableMap.width)
    }
  }

  return -1
}

/**
 * 交换两列单元格的内容
 */
function swapColumnCells(
  state: EditorState,
  tr: Transaction,
  table: { pos: number; node: ProseMirrorNode },
  colIndex: number,
  targetColIndex: number,
  swapOrder: 'left-to-right' | 'right-to-left'
) {
  const tableMap = TableMap.get(table.node)
  const tableStart = table.pos + 1

  // 遍历所有行，交换当前列和目标列的单元格内容
  for (let row = 0; row < tableMap.height; row++) {
    const currentCellOffset = tableMap.map[row * tableMap.width + colIndex]
    const targetCellOffset = tableMap.map[row * tableMap.width + targetColIndex]

    // 找到实际的单元格节点位置
    let currentCellActualPos = -1
    let targetCellActualPos = -1

    state.doc.nodesBetween(table.pos + 1, table.pos + table.node.nodeSize, (node, pos) => {
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        const cellOffset = pos - tableStart
        if (cellOffset === currentCellOffset) {
          currentCellActualPos = pos
        }
        if (cellOffset === targetCellOffset) {
          targetCellActualPos = pos
        }
      }
      return true
    })

    if (currentCellActualPos !== -1 && targetCellActualPos !== -1) {
      const currentCellNode = state.doc.nodeAt(currentCellActualPos)
      const targetCellNode = state.doc.nodeAt(targetCellActualPos)

      if (currentCellNode && targetCellNode) {
        // 交换两个单元格的内容
        const currentCellContent = currentCellNode.content
        const targetCellContent = targetCellNode.content

        // 根据交换顺序决定替换顺序
        // 左移：先替换 currentPos（右边的），再替换 targetPos（左边的）
        // 右移：先替换 targetPos（右边的），再替换 currentPos（左边的）
        if (swapOrder === 'left-to-right') {
          // 左移：先替换右边的，再替换左边的
          tr.replaceWith(
            currentCellActualPos + 1,
            currentCellActualPos + currentCellNode.nodeSize - 1,
            targetCellContent
          )
          tr.replaceWith(
            targetCellActualPos + 1,
            targetCellActualPos + targetCellNode.nodeSize - 1,
            currentCellContent
          )
        } else {
          // 右移：先替换右边的，再替换左边的
          tr.replaceWith(
            targetCellActualPos + 1,
            targetCellActualPos + targetCellNode.nodeSize - 1,
            currentCellContent
          )
          tr.replaceWith(
            currentCellActualPos + 1,
            currentCellActualPos + currentCellNode.nodeSize - 1,
            targetCellContent
          )
        }
      }
    }
  }
}

/**
 * 移动列
 */
export function moveColumn(
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined,
  direction: MoveColumnDirection
): boolean {
  const { selection } = state
  const cellAndTable = getCellAndTable(selection)

  if (!cellAndTable) {
    return false
  }

  const { cell, table } = cellAndTable
  const tableMap = TableMap.get(table.node)
  const colIndex = getColumnIndex(cell, table)

  if (colIndex === -1) {
    return false
  }

  // 检查边界条件
  if (direction === 'left' && colIndex === 0) {
    // 已经是第一列，无法左移
    return false
  }

  if (direction === 'right' && colIndex === tableMap.width - 1) {
    // 已经是最后一列，无法右移
    return false
  }

  const tr = state.tr
  const targetColIndex = direction === 'left' ? colIndex - 1 : colIndex + 1
  const swapOrder = direction === 'left' ? 'left-to-right' : 'right-to-left'

  swapColumnCells(state, tr, table, colIndex, targetColIndex, swapOrder)

  // 还原选区
  const newTableNode = tr.doc.nodeAt(table.pos)
  if (newTableNode) {
    const newTableMap = TableMap.get(newTableNode)
    const tableStart = table.pos + 1

    const topCellOffset = newTableMap.map[targetColIndex]
    const bottomCellOffset =
      newTableMap.map[(newTableMap.height - 1) * newTableMap.width + targetColIndex]

    const topCellPos = tableStart + topCellOffset
    const bottomCellPos = tableStart + bottomCellOffset

    const newSelection = CellSelection.create(tr.doc, topCellPos, bottomCellPos)
    tr.setSelection(newSelection)
  }

  if (dispatch) {
    dispatch(tr)
  }

  return true
}

/**
 * 移动行
 */
export function moveRow(
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined,
  direction: MoveRowDirection
): boolean {
  const { selection } = state
  const cellAndTable = getCellAndTable(selection)

  if (!cellAndTable) {
    return false
  }

  const { cell, table } = cellAndTable
  const tableMap = TableMap.get(table.node)
  const rowIndex = getRowIndex(cell, table)

  if (rowIndex === -1) {
    return false
  }

  const targetRowIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1

  if (targetRowIndex < 0 || targetRowIndex >= tableMap.height) {
    return false
  }

  // Check for vertical merges crossing the boundary
  for (let col = 0; col < tableMap.width; col++) {
    const pos1 = tableMap.map[rowIndex * tableMap.width + col]
    const pos2 = tableMap.map[targetRowIndex * tableMap.width + col]
    if (pos1 === pos2) {
      // Cannot move because a cell spans across the boundary
      return false
    }
  }

  if (dispatch) {
    const tr = state.tr
    const tableStart = table.pos + 1

    // Calculate row positions
    let rowPos = tableStart
    for (let i = 0; i < rowIndex; i++) {
      rowPos += table.node.child(i).nodeSize
    }
    const rowNode = table.node.child(rowIndex)

    let targetRowPos = tableStart
    for (let i = 0; i < targetRowIndex; i++) {
      targetRowPos += table.node.child(i).nodeSize
    }
    const targetRowNode = table.node.child(targetRowIndex)

    let newRowPos = 0
    if (direction === 'down') {
      // Moving down: Swap with the row below
      // Delete Row i
      tr.delete(rowPos, rowPos + rowNode.nodeSize)
      // Insert Row i after the original Row i+1
      // After deletion, Row i+1 is at rowPos.
      newRowPos = rowPos + targetRowNode.nodeSize
      tr.insert(newRowPos, rowNode)
    } else {
      // Moving up: Swap with the row above
      // Delete Row i
      tr.delete(rowPos, rowPos + rowNode.nodeSize)
      // Insert Row i at the position of Row i-1
      newRowPos = targetRowPos
      tr.insert(newRowPos, rowNode)
    }

    // 还原选区
    if (rowNode.childCount > 0) {
      const firstCellPos = newRowPos + 1
      const lastCellPos = newRowPos + rowNode.nodeSize - 1 - rowNode.lastChild!.nodeSize
      const newSelection = CellSelection.create(tr.doc, firstCellPos, lastCellPos)
      tr.setSelection(newSelection)
    }

    dispatch(tr)
  }

  return true
}

/**
 * 判断是否是第一列/最后一列
 */
export function getIsFirstOrLastColumn(editor: Editor) {
  const selection = editor.state.selection
  const cellAndTable = getCellAndTable(selection)
  if (!cellAndTable) {
    return { isFirstColumn: false, isLastColumn: false }
  }
  const { cell, table } = cellAndTable
  const tableMap = TableMap.get(table.node)
  const colIndex = getColumnIndex(cell, table)
  return { isFirstColumn: colIndex === 0, isLastColumn: colIndex === tableMap.width - 1 }
}

/**
 * 判断是否是第一行/最后一行
 */
export function getIsFirstOrLastRow(editor: Editor) {
  const selection = editor.state.selection
  const cellAndTable = getCellAndTable(selection)
  if (!cellAndTable) {
    return { isFirstRow: false, isLastRow: false }
  }
  const { cell, table } = cellAndTable
  const rowIndex = getRowIndex(cell, table)
  const tableMap = TableMap.get(table.node)
  return { isFirstRow: rowIndex === 0, isLastRow: rowIndex === tableMap.height - 1 }
}

/**
 * 清除选中的单元格的内容
 */
export function clearCellContent(
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined
) {
  const { selection } = state
  if (selection instanceof CellSelection) {
    if (dispatch) {
      const tr = state.tr
      const cells: { pos: number; size: number }[] = []
      selection.forEachCell((node, pos) => {
        cells.push({ pos, size: node.nodeSize })
      })

      cells.reverse().forEach(({ pos, size }) => {
        const empty = state.schema.nodes.paragraph.create()
        tr.replaceWith(pos + 1, pos + size - 1, empty)
      })
      dispatch(tr)
    }
    return true
  } else {
    // Handle single cell selection (TextSelection or NodeSelection inside a cell)
    const $from = selection.$from
    for (let d = $from.depth; d > 0; d--) {
      const node = $from.node(d)
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        if (dispatch) {
          const pos = $from.before(d)
          const size = node.nodeSize
          const empty = state.schema.nodes.paragraph.create()
          const tr = state.tr
          tr.replaceWith(pos + 1, pos + size - 1, empty)

          // Restore selection to the cleared cell
          const resolvedPos = tr.doc.resolve(pos + 2) // +1 for cell start, +1 for inside paragraph
          tr.setSelection(TextSelection.near(resolvedPos))

          dispatch(tr)
        }
        return true
      }
    }
  }
  return false
}
