import React from 'react'
import styled from 'styled-components'
import { MarkdownEditor } from '../core/MarkdownEditor'

interface MarkdownDisplayProps {
  content: string
  theme: 'light' | 'dark'
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 1rem 1.25rem;
`

export const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ content, theme }) => {
  return (
    <Wrapper>
      <MarkdownEditor
        content={content}
        isFullScreen={false}
        zoom={1}
        onBlur={() => {}}
        onUpdate={() => {}}
        theme={theme}
      />
    </Wrapper>
  )
}
