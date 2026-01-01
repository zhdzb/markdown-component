import { NodeViewContent } from '@tiptap/react'
import { StyledCodeBlockWrapper } from './style'

const CodeBlockView = () => {
  return (
    <StyledCodeBlockWrapper>
      <div className="code-container">
        <pre>
          <code>
            <NodeViewContent className="node-view-content" />
          </code>
        </pre>
      </div>
    </StyledCodeBlockWrapper>
  )
}

export default CodeBlockView
