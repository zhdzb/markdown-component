import Heading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'

export const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel ? node.attrs.level : this.options.levels[0]

    if (node.textContent) {
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          id: node.textContent.replaceAll(/\s+/g, '-').toLowerCase(),
        }),
        0,
      ]
    }
    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
})
