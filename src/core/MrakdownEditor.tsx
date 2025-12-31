interface MarkdownEditorProps {
  content: string
  isFullScreen: boolean
  zoom: number
  onBlur: () => void
  onChange: (content: string) => void
}

const MarkdownEditor = ({ content, isFullScreen, zoom, onBlur, onChange }: MarkdownEditorProps) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Heading, List, ListItem],
  })
}
