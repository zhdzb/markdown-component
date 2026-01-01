import CodeBlock from '@tiptap/extension-code-block'
import { ReactNodeViewRenderer } from '@tiptap/react'
import CodeBlockView from './codeBlockView'

const codeBlock = CodeBlock.extend({
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView, {
      className: 'my-6',
    })
  },
})

export const CustomCodeBlock = codeBlock.configure({
  HTMLAttributes: {
    // class: cn(
    //   'rounded !bg-gray-800 dark:!bg-gray-900 text-gray-200 border p-5 font-mono font-medium'
    // ),
    spellcheck: false,
  },
  enableTabIndentation: true,
  tabSize: 2,
  defaultLanguage: 'plaintext',
})
