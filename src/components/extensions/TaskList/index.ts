import { TaskList, TaskItem } from '@tiptap/extension-list'

export const CustomTaskList = TaskList.configure({
  HTMLAttributes: {
    class: 'not-prose pl-2',
  },
})

export const CustomTaskItem = TaskItem.configure({
  nested: true,
  HTMLAttributes: {
    class: 'flex gap-2 items-start my-4',
  },
})
