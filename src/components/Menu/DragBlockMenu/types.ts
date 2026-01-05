import { Node as ProseMirrorNode } from '@tiptap/pm/model'

// 支持 Turn Into 的节点类型
export const TURNABLE_NODE_TYPES = [
  'paragraph',
  'heading',
  'bulletList',
  'orderedList',
  'taskList',
  'blockquote',
  'codeBlock',
] as const

export type TurnableNodeType = (typeof TURNABLE_NODE_TYPES)[number]

// 判断节点是否支持 Turn Into
export const isTurnableNode = (node: ProseMirrorNode | null): boolean => {
  if (!node) return false
  return TURNABLE_NODE_TYPES.includes(node.type.name as TurnableNodeType)
}

// 获取当前节点类型的显示名称
export const getNodeTypeName = (node: ProseMirrorNode | null): string => {
  if (!node) return 'Unknown'

  const typeName = node.type.name

  if (typeName === 'heading') {
    const level = node.attrs.level
    return `Heading ${level}`
  }

  const nameMap: Record<string, string> = {
    paragraph: 'Text',
    bulletList: 'Bullet List',
    orderedList: 'Ordered List',
    taskList: 'Task List',
    blockquote: 'Blockquote',
    codeBlock: 'Code Block',
    table: 'Table',
    image: 'Image',
    horizontalRule: 'Divider',
  }

  return nameMap[typeName] || typeName
}
