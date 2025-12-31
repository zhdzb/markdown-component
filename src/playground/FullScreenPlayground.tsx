import React from 'react'
import styled from 'styled-components'
import { MarkdownDisplay } from '../components/MarkdownDisplay'

const Stage = styled.section`
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top right, rgba(107, 70, 193, 0.25), transparent 40%),
    radial-gradient(circle at 30% 0, rgba(34, 197, 94, 0.15), transparent 45%), #0f172a;
  color: #f8fafc;
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
}

export const FullScreenPlayground: React.FC<FullScreenPlaygroundProps> = ({ content }) => {
  return (
    <Stage>
      <MarkdownDisplay content={content} highlight />
      <Hint>Full screen mode — the component stretches with the viewport.</Hint>
    </Stage>
  )
}
