import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { markdownToHtml } from '../../../utils/markdown'
import { isMarkdownString } from '../../../utils/isMarkdownString'

export const PasteMarkdown = Extension.create({
  name: 'pasteMarkdown',

  addProseMirrorPlugins() {
    const extension = this

    return [
      new Plugin({
        key: new PluginKey('paste-markdown'),
        props: {
          handlePaste(view, event, slice) {
            const text = event.clipboardData?.getData('text/plain')

            // 如果没有文本，无法进行 Markdown 检测，直接返回
            if (!text) {
              return false
            }

            // 0. 处理 Mermaid 代码块粘贴
            // 如果粘贴的内容是一个完整的 Mermaid 代码块，直接插入 Mermaid 节点
            // 避免 marked 解析成普通代码块后可能出现的解析问题
            const mermaidRegex = /^\s*```mermaid\s*([\s\S]*?)\s*```\s*$/m
            const matchMermaid = text.match(mermaidRegex)
            console.log('matchMermaid', matchMermaid)
            if (matchMermaid) {
              const code = matchMermaid[1].trim()
              if (code) {
                extension.editor.commands.setMermaid({ code })
                return true
              }
            }

            // 1. 优先检测 Markdown 表格
            // 特征：| 内容 | 换行 | --- |
            const tableRegex = /^\|.+\|\s*\n\s*\|[-: ]+\|/m
            if (tableRegex.test(text)) {
              // 将 Markdown 文本转换成 HTML 表格字符串
              // 注意：markdownToHtml (marked) 已经包含了非常完善的表格转换逻辑
              // 相比手写的 convertMarkdownToHtml，marked 能更好地处理对齐、单元格内格式等
              const parsedHtml = markdownToHtml(text)

              if (parsedHtml) {
                // 使用 insertContent 插入 HTML
                // 这与手动构造 Element + parse Slice 的效果是一样的，insertContent 内部也是走的 parse
                extension.editor.commands.insertContent(parsedHtml)
                return true
              }
            }

            // 2. 其他 Markdown 语法检测
            if (isMarkdownString(text)) {
              // 将 Markdown 转换为 HTML
              const parsedHtml = markdownToHtml(text)

              if (parsedHtml) {
                // 使用 insertContent 插入 HTML，Tiptap 会自动解析为对应的节点
                // 开启 parseOptions.preserveWhitespace 可以保留代码块中的空白
                extension.editor.commands.insertContent(parsedHtml, {
                  parseOptions: {
                    preserveWhitespace: 'full',
                  },
                })
                return true
              }
            }

            return false
          },
        },
      }),
    ]
  },
})
