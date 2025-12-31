import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../../ui/DropdownMenu'
import {
  StyledColumnMenuTrigger,
  StyledRowMenuTrigger,
  StyledCellMenuTrigger,
  StyledTableMenuContent,
  StyledDestructiveMenuItem,
} from './style'
import { PluginKey, TextSelection } from '@tiptap/pm/state'
import { CellSelection, deleteCellSelection } from '@tiptap/pm/tables'
import { Editor, useEditorState } from '@tiptap/react'
// import { EllipsisIcon, EllipsisVerticalIcon, EqualIcon } from "lucide-react";
import { useMemo, useState } from 'react'
import {
  columnMenuPluginKey,
  rowMenuPluginKey,
  TableMenuHandle,
  TableMenuHandleProps,
  TableSelectionOverlay,
  TableSelectionOverlayProps,
} from '../../extensions/table'

interface CellMenusState {
  canMergeCell: boolean
  canSplitCell: boolean
  canClearContents: boolean
}

const ColumnMenuPopover = ({ editor }: { editor: Editor }) => {
  const [opened, setOpened] = useState(false)
  return (
    <DropdownMenu
      modal
      onOpenChange={open => {
        setOpened(open)
        editor
          .chain()
          .command(({ tr }) => {
            tr.setMeta(columnMenuPluginKey, { openedMenu: open })
            return true
          })
          .run()
      }}
    >
      <StyledColumnMenuTrigger $opened={opened}>
        {/* <EllipsisIcon className="size-4" /> */}
        ...
      </StyledColumnMenuTrigger>
      <StyledTableMenuContent
        align="start"
        // style={{
        //   width: "var(--radix-dropdown-menu-trigger-width)"
        // }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().addColumnBefore().run()
            }}
          >
            Add column before
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().addColumnAfter().run()
            }}
          >
            Add column after
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <StyledDestructiveMenuItem
            onClick={() => {
              editor.chain().focus().deleteColumn().run()
            }}
          >
            Delete column
          </StyledDestructiveMenuItem>
        </DropdownMenuGroup>
      </StyledTableMenuContent>
    </DropdownMenu>
  )
}

const RowMenuPopover = ({ editor }: { editor: Editor }) => {
  const [opened, setOpened] = useState(false)
  return (
    <DropdownMenu
      modal
      onOpenChange={open => {
        setOpened(open)
        editor
          .chain()
          .command(({ tr }) => {
            tr.setMeta(rowMenuPluginKey, { openedMenu: open })
            return true
          })
          .run()
      }}
    >
      <StyledRowMenuTrigger $opened={opened}>
        {/* <EllipsisVerticalIcon className="size-4 shrink-0" /> */}
        ...
      </StyledRowMenuTrigger>
      <StyledTableMenuContent align="start" side="right">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().addRowBefore().run()
            }}
          >
            Add row before
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().addRowAfter().run()
            }}
          >
            Add row after
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <StyledDestructiveMenuItem
            onClick={() => {
              editor.chain().focus().deleteRow().run()
            }}
          >
            Delete row
          </StyledDestructiveMenuItem>
        </DropdownMenuGroup>
      </StyledTableMenuContent>
    </DropdownMenu>
  )
}

const CellMenuPopover = ({ editor }: { editor: Editor }) => {
  const [opened, setOpened] = useState(false)
  const { canMergeCell, canSplitCell, canClearContents } = useEditorState<CellMenusState>({
    editor: editor,
    equalityFn: (a, b) => {
      return (
        a.canMergeCell === b?.canMergeCell &&
        a.canSplitCell === b.canSplitCell &&
        a.canClearContents === b.canClearContents
      )
    },
    selector: instance => {
      const editor = instance.editor
      const { selection } = editor.state
      const { from, to, ranges } = selection
      if (!instance.editor.isActive('table')) {
        return {
          canMergeCell: false,
          canSplitCell: false,
          canClearContents: false,
        }
      }

      let hasSpannedCell = false
      let cellSelectionCount = 0
      let selectionContentSize = 0

      if (selection instanceof TextSelection) {
        editor.state.doc.nodesBetween(from, to, (node, pos) => {
          const nodeName = node.type.name
          if (nodeName === 'tableHeader' || nodeName === 'tableCell') {
            const cell = editor.view.nodeDOM(pos) as HTMLTableCellElement
            hasSpannedCell = cell.colSpan > 1 || cell.rowSpan > 1
            return false
          }
          return true
        })
      }

      if (selection instanceof CellSelection) {
        cellSelectionCount = selection.ranges.length
        for (const range of ranges) {
          const { $from, $to } = range
          editor.state.doc.nodesBetween($from.pos, $to.pos, node => {
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

  return (
    <DropdownMenu
      onOpenChange={open => {
        setOpened(open)
      }}
    >
      <StyledCellMenuTrigger $opened={opened}>
        {/* <EqualIcon
          className={cn('size-3.5 text-primary-foreground opacity-0 hover:opacity-100', {
            'opacity-100': opened,
          })}
        /> */}
        +
      </StyledCellMenuTrigger>
      <StyledTableMenuContent align="start" side="bottom">
        <DropdownMenuGroup>
          <DropdownMenuItem
            hidden={!canMergeCell}
            onClick={() => {
              editor.chain().focus().mergeCells().run()
            }}
          >
            Merge cells
          </DropdownMenuItem>
          <DropdownMenuItem
            hidden={!canSplitCell}
            onClick={() => {
              editor.chain().focus().splitCell().run()
            }}
          >
            Split cell
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().toggleHeaderCell().run()
            }}
          >
            Toggle header cell
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Alignment</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => {
                    editor.chain().focus().setCellAttribute('verticalAlign', 'top').run()
                  }}
                >
                  Align top
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    editor.chain().focus().setCellAttribute('verticalAlign', 'middle').run()
                  }}
                >
                  Align middle
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    editor.chain().focus().setCellAttribute('verticalAlign', 'bottom').run()
                  }}
                >
                  Align bottom
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            hidden={!canClearContents}
            onClick={() => {
              editor
                .chain()
                .focus()
                .command(({ state, dispatch }) => {
                  return deleteCellSelection(state, dispatch)
                })
                .run()
            }}
          >
            Clear contents
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </StyledTableMenuContent>
    </DropdownMenu>
  )
}

export const TableHandle = ({ editor }: { editor: Editor | null }) => {
  const columnMenuPluginProps = useMemo(() => {
    if (!editor) {
      return undefined
    }
    return {
      editor,
      menuType: 'column',
      pluginKey: columnMenuPluginKey,
      options: {
        placement: 'top-start',
        offset: {
          mainAxis: 4,
        },
      },
    } satisfies TableMenuHandleProps['pluginProps']
  }, [editor])

  const rowMenuPluginProps = useMemo(() => {
    if (!editor) {
      return undefined
    }
    return {
      editor,
      menuType: 'row',
      pluginKey: rowMenuPluginKey,
      options: {
        placement: 'left-start',
        offset: {
          mainAxis: 4,
        },
      },
    } satisfies TableMenuHandleProps['pluginProps']
  }, [editor])

  const tableSelectionOverlayProps = useMemo(() => {
    if (!editor) {
      return undefined
    }
    return {
      editor,
      pluginKey: new PluginKey('table-selection-overlay'),
    } satisfies TableSelectionOverlayProps['pluginProps']
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <>
      {columnMenuPluginProps && (
        <TableMenuHandle pluginProps={columnMenuPluginProps}>
          <ColumnMenuPopover editor={editor} />
        </TableMenuHandle>
      )}
      {rowMenuPluginProps && (
        <TableMenuHandle pluginProps={rowMenuPluginProps}>
          <RowMenuPopover editor={editor} />
        </TableMenuHandle>
      )}

      {tableSelectionOverlayProps && (
        <TableSelectionOverlay pluginProps={tableSelectionOverlayProps}>
          <CellMenuPopover editor={editor} />
        </TableSelectionOverlay>
      )}
    </>
  )
}
