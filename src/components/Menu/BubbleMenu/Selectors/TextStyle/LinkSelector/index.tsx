import { Button } from '@/ui/Button'
import { Input } from '@/ui/Input'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/Popover'
import { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { CheckIcon, LinkIcon, Trash2Icon } from 'lucide-react'
import { forwardRef, useRef } from 'react'
import { StyledForm } from './style'

export const LinkSelector = forwardRef<HTMLButtonElement, { editor: Editor }>(({ editor }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const editorState = useEditorState({
    editor,
    selector: instance => ({
      isLink: instance.editor.isActive('link'),
      getLink: instance.editor.getAttributes('link').href,
      isMath: instance.editor.isActive('math'),
    }),
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className="rounded-none flex-shrink-0"
          disabled={editorState.isMath}
        >
          <LinkIcon
            className={`size-4 ${editorState.isLink ? 'text-primary' : ''}`}
            strokeWidth={2.5}
            // style={{
            //   color: editorState.isLink ? 'hsl(var(--primary))' : 'currentColor',
            // }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit shadow-xl rounded-md border p-1" align="end" noPortal>
        <StyledForm
          onSubmit={evt => {
            evt.preventDefault()
            const url = inputRef.current?.value
            console.log('url', url)
            if (!url) {
              return
            }
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
          }}
        >
          <Input ref={inputRef} placeholder="Paste a link..." defaultValue={editorState.getLink} />
          {editorState.isLink ? (
            <Button
              variant="destructive"
              size="icon"
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run()
                if (inputRef.current) {
                  inputRef.current.value = ''
                }
              }}
            >
              <Trash2Icon className="size-4" />
            </Button>
          ) : (
            <Button size="icon">
              <CheckIcon className="size-4" />
            </Button>
          )}
        </StyledForm>
      </PopoverContent>
    </Popover>
  )
})

LinkSelector.displayName = 'LinkSelector'

