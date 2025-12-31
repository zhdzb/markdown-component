import StarterKit from '@tiptap/starter-kit'

export const CustomStarterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      // class: cn("list-disc list-outside leading-3 -mt-2"),
      class: 'tp-bullet-list',
    },
  },
  orderedList: {
    HTMLAttributes: {
      // class: cn("list-decimal list-outside leading-3 -mt-2"),
      class: 'tp-ordered-list',
    },
  },
  listItem: {
    HTMLAttributes: {
      // class: cn("leading-normal -mb-2"),
      class: 'tp-list-item',
    },
  },
  blockquote: {
    HTMLAttributes: {
      // class: cn("border-l-4 border-gray-600"),
      class: 'tp-block-quote',
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      // class: cn(
      //   "rounded-lg bg-muted text-red-700 dark:bg-muted/90 dark:text-red-400 px-1.5 py-1 font-mono font-medium before:content-none after:content-none"
      // ),
      class: 'tp-code-block',
      spellcheck: 'false',
    },
  },
  horizontalRule: {
    HTMLAttributes: {
      // class: cn("my-4 bg-border border-border"),
      class: 'tp-horizontal-rule',
    },
  },
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  // gapcursor: false,
  heading: false,
  link: {
    HTMLAttributes: {
      // class: cn(
      //   "!text-foreground underline underline-offset-[3px] transition-colors cursor-pointer"
      // ),
      class: 'tp-link',
    },
    openOnClick: false,
  },
})
