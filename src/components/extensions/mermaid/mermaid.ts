import { mergeAttributes, Node } from '@tiptap/core'
import { NodeSelection } from '@tiptap/pm/state'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { MermaidView } from './mermaidView'

export interface MermaidOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mermaidCommands: {
      setMermaid: (props: { code: string }) => ReturnType
      updateMermaid: (props: { code: string }) => ReturnType
    }
  }
}

const mermaid = Node.create<MermaidOptions>({
  name: 'mermaid',
  group: 'block',
  content: 'text*',
  marks: '',
  atom: true,
  draggable: true,
  allowGapCursor: true,

  addAttributes() {
    return {
      'data-content-type': {
        default: this.name,
      },
    }
  },

  addCommands() {
    return {
      setMermaid: ({ code }) => {
        return ({ commands }) => {
          if (!code) {
            return false
          }

          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'text',
                text: code,
              },
            ],
          })
        }
      },
      updateMermaid: ({ code }) => {
        return ({ state, commands }) => {
          if (!code) {
            return false
          }

          const { selection } = state

          if (!(selection instanceof NodeSelection)) {
            return false
          }

          if (selection.node.type.name !== this.name) {
            return false
          }

          const { from, to } = selection

          return commands.insertContentAt(
            { from, to },
            {
              type: this.name,
              content: [
                {
                  type: 'text',
                  text: code,
                },
              ],
            }
          )
        }
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div[data-content-type="${this.name}"]`,
        preserveWhitespace: 'full',
        // Tiptap 会自动解析文本内容，因为节点定义了 content: 'text*'
      },
      {
        tag: 'div.mermaid',
        preserveWhitespace: 'full',
        // 支持只有 class="mermaid" 的 div（从 markdown 转换而来）
        // Tiptap 会自动解析文本内容
      },
    ]
  },

  renderText({ node }) {
    return node.textContent ?? ''
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        // class: cn('border my-4 w-full'),
      }),
      0,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidView, {
      attrs: () => {
        return {
          contentEditable: 'false',
        }
      },
    })
  },
})

export const Mermaid = mermaid.configure({
  HTMLAttributes: {
    class: 'mermaid',
  },
})
