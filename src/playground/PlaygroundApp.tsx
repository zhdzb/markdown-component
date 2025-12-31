import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FullScreenPlayground } from './FullScreenPlayground'
import { ResizablePlayground } from './ResizablePlayground'

const AppShell = styled.main`
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  background: linear-gradient(180deg, #eef2ff, #f8fafc 60%);
  color: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

const Title = styled.h1`
  font-size: clamp(2rem, 3vw, 2.5rem);
  margin: 0;
  text-align: center;
`

const SwitchRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

const ModeButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#312e81' : '#ffffff')};
  color: ${({ active }) => (active ? '#f8fafc' : '#312e81')};
  border: 1px solid ${({ active }) => (active ? '#312e81' : '#c7d2fe')};
  border-radius: 999px;
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? '#2e2bb7' : '#e0e7ff')};
  }
`

const Subtitle = styled.p`
  max-width: 720px;
  text-align: center;
  margin: 0;
  color: #475569;
`

type PlaygroundMode = 'fullscreen' | 'nested'

const sampleContent = `
<h2>Markdown Widget</h2>
<p>This is the shell of your exported component. Use it to surface structured text, inline code, and rich hints.</p>
<ul>
  <li>React + TypeScript + styled-components</li>
  <li>Playground logic stays in dev mode, never bundled</li>
</ul>
`

export const PlaygroundApp = () => {
  const [mode, setMode] = useState<PlaygroundMode>('fullscreen')
  const description = useMemo(
    () =>
      mode === 'fullscreen'
        ? 'Full screen mode mimics how your component behaves when it owns the viewport.'
        : 'Nested mode shows how the component behaves when resized or scaled inside another host.',
    [mode]
  )

  return (
    <AppShell>
      <Title>组件 Playground</Title>
      <Subtitle>切换以下模式以验证组件在不同容器下的表现。</Subtitle>
      <SwitchRow>
        <ModeButton active={mode === 'fullscreen'} onClick={() => setMode('fullscreen')}>
          全屏模式
        </ModeButton>
        <ModeButton active={mode === 'nested'} onClick={() => setMode('nested')}>
          可缩放嵌套模式
        </ModeButton>
      </SwitchRow>
      <Subtitle>{description}</Subtitle>
      {mode === 'fullscreen' ? (
        <FullScreenPlayground content={sampleContent} />
      ) : (
        <ResizablePlayground content={sampleContent} />
      )}
    </AppShell>
  )
}
