import React from 'react'
import styled from 'styled-components'
import { MarkdownDisplay } from '../components/MarkdownDisplay'

const Stage = styled.section`
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  /* color: #f8fafc; */
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 24px;
  overflow: hidden;
`

const Hint = styled.p`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  margin: 0;
`

export interface FullScreenPlaygroundProps {
  content: string
  theme: 'light' | 'dark'
}

export const FullScreenPlayground: React.FC<FullScreenPlaygroundProps> = ({ content, theme }) => {
  return (
    <Stage>
      <MarkdownDisplay content={content} theme={theme} />
      <Hint>Full screen mode — the component stretches with the viewport.</Hint>
    </Stage>
  )
}
