import { menuSvg } from '../../../svg'
import { OnUploadImage } from '../Image'
import { CommandSuggestionItem } from './suggestionList'

export interface ImageCommandOptions {
  onUploadImage?: OnUploadImage
}

export const createImageItem = (options: ImageCommandOptions): CommandSuggestionItem => ({
  id: 'image',
  title: 'Image',
  description: 'Insert an image from your device.',
  keywords: ['image', 'img', 'photo', 'picture'],
  icon: menuSvg.Image,
  command: ({ editor, range }) => {
    if (typeof document === 'undefined') {
      return
    }

    const insertPosition = range.from
    editor.chain().focus().deleteRange(range).run()

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.jpeg,.jpg,.png,.gif,.webp'
    input.style.display = 'none'

    const cleanup = () => {
      input.value = ''
      input.remove()
    }

    const handleChange = async () => {
      const file = input.files?.[0]
      cleanup()

      if (!file || !file.type.startsWith('image/')) {
        return
      }

      try {
        const uploadResult = options.onUploadImage
          ? await options.onUploadImage(file)
          : { src: URL.createObjectURL(file), alt: file.name, title: file.name }

        if (!uploadResult?.src) {
          return
        }

        const attrs = {
          src: uploadResult.src,
          alt: uploadResult.alt ?? file.name,
          title: uploadResult.title ?? file.name,
          width: uploadResult.width,
          align: uploadResult.align ?? 'center',
        }

        editor
          .chain()
          .focus()
          .insertContentAt(insertPosition, {
            type: 'customImage',
            attrs,
          })
          .run()

        if (!options.onUploadImage) {
          // revoke the object URL when we created it internally
          setTimeout(() => URL.revokeObjectURL(attrs.src), 30000)
        }
      } catch (error) {
        console.error('Failed to insert image from slash command', error)
      }
    }

    input.addEventListener('change', handleChange, { once: true })
    document.body.appendChild(input)
    input.click()
  },
})
