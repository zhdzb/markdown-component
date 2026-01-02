export function isMarkdownString(text: string): boolean {
  // 基础 Markdown 语法检测
  const patterns = [
    /^#{1,6}\s/m, // 标题
    /^\s*[-*+]\s/m, // 列表
    /^\s*\d+\.\s/m, // 有序列表
    /^\s*>/m, // 引用
    /```[\s\S]*?```/m, // 代码块
    /^\s*```mermaid\s*([\s\S]*?)\s*```\s*$/m, // mermaid
    /`[^`]+`/, // 行内代码
    /\[.+\]\(.+\)/, // 链接
    /\*\*[^*]+\*\*/, // 粗体 (**text**)
    /[^*]\*[^*]+\*[^*]/, // 斜体 (*text*) - 修正正则避免误判
    /__[^_]+__/, // 粗体 (__text__)
    /_[^_]+_/, // 斜体 (_text_)
    /!\[.+\]\(.+\)/, // 图片
    /^\|(.+)\|$/m, // 表格
    /^---$/m, // 分割线
  ]

  return patterns.some(pattern => pattern.test(text))
}
