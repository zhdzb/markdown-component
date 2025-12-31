import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FullScreenPlayground } from './FullScreenPlayground'
import { ResizablePlayground } from './ResizablePlayground'
import { data } from '../../mock/markdownData'

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

const ModeButton = styled.button`
  background: #312e81;
  color: #f8fafc;
  border: 1px solid #312e81;
  border-radius: 999px;
  padding: 0.65rem 1.5rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #2e2bb7;
  }
  &:disabled {
    background: #94a3b8;
    border-color: #94a3b8;
    cursor: not-allowed;
  }
`

const Subtitle = styled.p`
  max-width: 720px;
  text-align: center;
  margin: 0;
  color: #475569;
`

type PlaygroundMode = 'fullscreen' | 'nested'

export const PlaygroundApp = () => {
  const [mode, setMode] = useState<PlaygroundMode>('fullscreen')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const description = useMemo(
    () =>
      mode === 'fullscreen'
        ? 'Full screen mode mimics how your component behaves when it owns the viewport.'
        : 'Nested mode shows how the component behaves when resized or scaled inside another host.',
    [mode]
  )

  return (
    <AppShell>
      <Title>Markdown Editor Playground</Title>
      <Subtitle>模拟proto中Markdown编辑器的使用场景</Subtitle>
      <SwitchRow>
        <ModeButton disabled={mode === 'fullscreen'} onClick={() => setMode('fullscreen')}>
          全屏模式
        </ModeButton>
        <ModeButton disabled={mode === 'nested'} onClick={() => setMode('nested')}>
          可缩放嵌套模式
        </ModeButton>
        <ModeButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'dark' : 'light'}
        </ModeButton>
      </SwitchRow>
      <Subtitle>{description}</Subtitle>
      {mode === 'fullscreen' ? (
        <FullScreenPlayground content={data} theme={theme} />
      ) : (
        <ResizablePlayground content={data} theme={theme} />
      )}
    </AppShell>
  )
}
