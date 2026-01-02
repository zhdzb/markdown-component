import TurndownService from 'turndown'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// 仅提供一个基础实现，实际规则可根据业务继续丰富（保留颜色、高亮等）
const turndown = new TurndownService({
  codeBlockStyle: 'fenced', // 使用 ``` 风格的代码块
})

// 添加 mermaid 转 markdown 规则
turndown.addRule('mermaid', {
  filter: node => {
    return node.nodeName === 'DIV' && node.classList.contains('mermaid')
  },
  replacement: (content, node) => {
    return '\n```mermaid\n' + node.textContent?.trim() + '\n```\n'
  },
})

export function markdownToHtml(md: string | undefined) {
  if (!md) return '<p></p>'

  // 预处理：确保 mermaid 代码块前面有换行，以便 marked 正确识别
  // 匹配紧跟在非换行字符后面的 ```mermaid，在前面添加换行
  const preprocessedMd = md.replace(/([^\n])\n```mermaid/g, '$1\n\n```mermaid')

  const htmlResult = marked.parse(preprocessedMd, {
    gfm: true,
    breaks: true,
  })

  // marked v17 可能返回 Promise，需要处理
  const html = typeof htmlResult === 'string' ? htmlResult : htmlResult.toString()

  // 1. 处理 mermaid 代码块
  // marked 会将 ```mermaid ... ``` 解析为 <pre><code class="language-mermaid">...</code></pre>
  // 我们需要将其转换为 <div class="mermaid" data-content-type="mermaid">...</div> 以便 Mermaid 扩展识别
  const processedHtml = html.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
    (match: string, code: string) => {
      // 解码 HTML 实体
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      return `<div class="mermaid" data-content-type="mermaid">${decodedCode}</div>`
    }
  )

  console.log('===', processedHtml)

  return DOMPurify.sanitize(processedHtml, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['div'], // 确保 div 标签不被过滤
    ADD_ATTR: ['class', 'data-content-type'],
  })
}

export function htmlToMarkdown(html: string | undefined) {
  if (!html) return ''
  console.log(turndown.turndown(html))
  return turndown.turndown(html)
}
