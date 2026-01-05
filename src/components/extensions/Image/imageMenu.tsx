import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  DownloadIcon,
  Trash2Icon,
} from 'lucide-react'
import { Button } from '@/ui/Button'
import { Separator } from '@/ui/Separator'
import { StyledImageMenu, StyledImageMenuContent } from './style'
import { MenuPosition } from './useImageMenu'

interface ImageMenuProps {
  menuPosition: MenuPosition | null
  selected: boolean
  align: 'left' | 'center' | 'right'
  onAlignChange: (align: 'left' | 'center' | 'right') => void
  onDownload: () => void
  onDelete: () => void
}

export const ImageMenu = ({
  menuPosition,
  selected,
  align,
  onAlignChange,
  onDownload,
  onDelete,
}: ImageMenuProps) => {
  if (!menuPosition) {
    return null
  }

  return (
    <StyledImageMenu
      className="tiptap-image-menu"
      data-placement={menuPosition.placement}
      data-visible={selected}
      style={{ left: `${menuPosition.left}px`, top: `${menuPosition.top}px` }}
    >
      <StyledImageMenuContent>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none"
          onClick={() => onAlignChange('left')}
        >
          <AlignLeftIcon
            className={`size-4 ${align === 'left' ? 'text-primary' : ''}`}
            strokeWidth={2.5}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none"
          onClick={() => onAlignChange('center')}
        >
          <AlignCenterIcon
            className={`size-4 ${align === 'center' ? 'text-primary' : ''}`}
            strokeWidth={2.5}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-none"
          onClick={() => onAlignChange('right')}
        >
          <AlignRightIcon
            className={`size-4 ${align === 'right' ? 'text-primary' : ''}`}
            strokeWidth={2.5}
          />
        </Button>
        <Separator orientation="vertical" />
        <Button variant="ghost" size="icon" className="rounded-none" onClick={onDownload}>
          <DownloadIcon className="size-4" strokeWidth={2.5} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-none" onClick={onDelete}>
          <Trash2Icon className="size-4" strokeWidth={2.5} />
        </Button>
      </StyledImageMenuContent>
    </StyledImageMenu>
  )
}
