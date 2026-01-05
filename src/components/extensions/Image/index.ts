import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageView from './imageView'

export interface UploadedImageInfo {
  src: string
  alt?: string
  title?: string
  width?: number
  align?: 'left' | 'center' | 'right'
}

export type OnUploadImage = (file: File) => Promise<UploadedImageInfo>

const customImage = Image.extend({
  name: 'customImage',
  group: 'block',
  draggable: false,
  selectable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => {
          const width = element.getAttribute('data-width') || element.style.width.replace('px', '')
          const parsed = width ? Number(width) : NaN
          return Number.isNaN(parsed) ? null : parsed
        },
        renderHTML: attributes => {
          if (!attributes.width) {
            return {}
          }

          return { 'data-width': attributes.width }
        },
      },
      align: {
        default: 'center',
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView)
  },
})

export const CustomImage = customImage
