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
} from '@/ui/DropdownMenu'
import {
  StyledColumnMenuTrigger,
  StyledRowMenuTrigger,
  StyledCellMenuTrigger,
  StyledTableMenuContent,
  StyledDestructiveMenuItem,
} from './style'
import { columnMenuPluginKey, rowMenuPluginKey } from '@/components/extensions/table'
import { useTableSelectionState } from './hooks/useTableSelectionState'
import { Editor } from '@tiptap/react'
import { PluginKey } from '@tiptap/pm/state'
// import { EllipsisIcon, EllipsisVerticalIcon, EqualIcon } from "lucide-react";
import { useMemo, useState } from 'react'
import {
  TableSelectionOverlay,
  TableSelectionOverlayProps,
  getIsFirstOrLastRow,
  getIsFirstOrLastColumn,
  TableAddHandle,
  TableAddHandleProps,
  rowAddPluginKey,
  columnAddPluginKey,
  tableSelectionOverlayPluginKey,
  TableMenuHandle,
  TableMenuHandleProps,
} from '@/components/extensions/table'
import { ColorPickerSubmenu, AlignSubmenu } from './SubMenu'
import { StyledTableAddHandle } from './style'

const ColumnMenuPopover = ({ editor }: { editor: Editor }) => {
  const [opened, setOpened] = useState(false)
  const { isFirstColumn = false, isLastColumn = false } = getIsFirstOrLastColumn(editor)
  const { canClearContents } = useTableSelectionState(editor)

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
          {!isFirstColumn && (
            <DropdownMenuItem
              onClick={() => {
                ;(editor.chain().focus() as any).moveColumnLeft().run()
              }}
            >
              Move column left
            </DropdownMenuItem>
          )}
          {!isLastColumn && (
            <DropdownMenuItem
              onClick={() => {
                ;(editor.chain().focus() as any).moveColumnRight().run()
              }}
            >
              Move column right
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
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
          <ColorPickerSubmenu editor={editor} />
          <AlignSubmenu editor={editor} />
          <DropdownMenuItem
            hidden={!canClearContents}
            onClick={() => {
              ;(editor.chain().focus() as any).clearContents().run()
            }}
          >
            Clear contents
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
  const { isFirstRow = false, isLastRow = false } = getIsFirstOrLastRow(editor)
  const { canClearContents } = useTableSelectionState(editor)

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
          {!isFirstRow && (
            <DropdownMenuItem
              onClick={() => {
                ;(editor.chain().focus() as any).moveRowUp().run()
              }}
            >
              Move row up
            </DropdownMenuItem>
          )}
          {!isLastRow && (
            <DropdownMenuItem
              onClick={() => {
                ;(editor.chain().focus() as any).moveRowDown().run()
              }}
            >
              Move row down
            </DropdownMenuItem>
          )}
          {(!isFirstRow || !isLastRow) && <DropdownMenuSeparator />}
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
          <ColorPickerSubmenu editor={editor} />
          <AlignSubmenu editor={editor} />
          <DropdownMenuItem
            hidden={!canClearContents}
            onClick={() => {
              ;(editor.chain().focus() as any).clearContents().run()
            }}
          >
            Clear contents
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
  const { canMergeCell, canSplitCell, canClearContents } = useTableSelectionState(editor)

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
          <ColorPickerSubmenu editor={editor} />
          <AlignSubmenu editor={editor} />
          <DropdownMenuItem
            hidden={!canClearContents}
            onClick={() => {
              ;(editor.chain().focus() as any).clearContents().run()
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
    console.log('tableSelectionOverlayProps', editor)
    if (!editor) {
      return undefined
    }
    return {
      editor,
      pluginKey: new PluginKey('table-selection-overlay'),
    } satisfies TableSelectionOverlayProps['pluginProps']
  }, [editor])

  const rowAddPluginProps = useMemo(() => {
    if (!editor) {
      return undefined
    }
    return {
      editor,
      menuType: 'row',
      pluginKey: rowAddPluginKey,
      options: {
        placement: 'bottom',
        offset: 8,
      },
    } satisfies TableAddHandleProps['pluginProps']
  }, [editor])

  const columnAddPluginProps = useMemo(() => {
    if (!editor) {
      return undefined
    }
    return {
      editor,
      menuType: 'column',
      pluginKey: columnAddPluginKey,
      options: {
        placement: 'right',
        offset: 8,
      },
    } satisfies TableAddHandleProps['pluginProps']
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

      {rowAddPluginProps && (
        <TableAddHandle pluginProps={rowAddPluginProps}>
          <StyledTableAddHandle
            onClick={() => {
              const pluginState = rowAddPluginKey.getState(editor.state)
              const currentTablePos = pluginState?.currentTablePos
              if (typeof currentTablePos === 'number') {
                const tr = editor.state.tr
                const tableNode = editor.state.doc.nodeAt(currentTablePos)
                if (tableNode) {
                  const tableEndPos = currentTablePos + tableNode.content.size
                  // Move cursor to the end of the table to ensure we add row to this table
                  // Actually, addRowAfter usually works on selection.
                  // We can try to set selection to the last cell of the table
                  const lastCellPos = currentTablePos + tableNode.nodeSize - 2 // Approximate last cell
                  // Better: find last cell
                  // We can manually insert a row at the end of the table without changing selection visually first?
                  // Or just set selection to table and call addRowAfter

                  // Let's set selection to the end of the table to be safe
                  // editor.chain().setTextSelection(tableEndPos).addRowAfter().run()
                  // But we don't want to change selection if possible or at least not focus it weirdly
                  // If we use command, we can target specific table if the command supports it, but default addRowAfter uses selection.

                  // Let's try to set selection to the last cell of this specific table
                  // find last cell inside table
                  let lastCellPosResolved = -1
                  editor.state.doc.nodesBetween(
                    currentTablePos,
                    currentTablePos + tableNode.nodeSize,
                    (node, pos) => {
                      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
                        lastCellPosResolved = pos
                      }
                    }
                  )

                  if (lastCellPosResolved !== -1) {
                    editor
                      .chain()
                      .command(({ tr }) => {
                        tr.setMeta(tableSelectionOverlayPluginKey, { suppress: true })
                        tr.setMeta('table-selection-overlay-suppress', true)
                        return true
                      })
                      .setTextSelection(lastCellPosResolved + 1)
                      .addRowAfter()
                      .blur()
                      .run()
                  }
                }
              }
            }}
          >
            +
          </StyledTableAddHandle>
        </TableAddHandle>
      )}

      {columnAddPluginProps && (
        <TableAddHandle pluginProps={columnAddPluginProps}>
          <StyledTableAddHandle
            onClick={() => {
              const pluginState = columnAddPluginKey.getState(editor.state)
              const currentTablePos = pluginState?.currentTablePos
              if (typeof currentTablePos === 'number') {
                const tableNode = editor.state.doc.nodeAt(currentTablePos)
                if (tableNode) {
                  // Find the last cell to ensure we are in the right table
                  let lastCellPosResolved = -1
                  editor.state.doc.nodesBetween(
                    currentTablePos,
                    currentTablePos + tableNode.nodeSize,
                    (node, pos) => {
                      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
                        lastCellPosResolved = pos
                      }
                    }
                  )

                  if (lastCellPosResolved !== -1) {
                    editor
                      .chain()
                      .command(({ tr }) => {
                        tr.setMeta(tableSelectionOverlayPluginKey, { suppress: true })
                        tr.setMeta('table-selection-overlay-suppress', true)
                        return true
                      })
                      .setTextSelection(lastCellPosResolved + 1)
                      .addColumnAfter()
                      .blur()
                      .run()
                  }
                }
              }
            }}
          >
            +
          </StyledTableAddHandle>
        </TableAddHandle>
      )}
    </>
  )
}
