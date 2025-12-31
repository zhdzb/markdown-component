import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { MarkdownDisplay } from '../components/MarkdownDisplay'

const Container = styled.section`
  width: 100%;
  padding: 1rem;
  border-radius: 18px;
  background: #f9fafb;
  border: 1px dashed #cbd5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const Frame = styled.div`
  position: relative;
  width: 400px;
  height: 533px;
  min-height: 320px;
  border-radius: 16px;
  border: 1px solid #d1d5db;
  resize: both;
  overflow: hidden;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);
`

const ScaledView = styled.div<{ scale: number }>`
  width: 100%;
  height: 100%;
  transform-origin: top left;
  transform: scale(${({ scale }) => scale});
  display: flex;
  align-items: center;
  justify-content: center;
`

const ScaleIndicator = styled.span`
  font-size: 0.85rem;
  color: #475569;
`

const Hint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #475569;
`

export const ResizablePlayground: React.FC<{ content: string; theme: 'light' | 'dark' }> = ({
  content,
  theme,
}) => {
  const [scale, setScale] = useState(1)

  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault()
        event.stopPropagation()
        setScale(prev => {
          const delta = event.deltaY > 0 ? -0.05 : 0.05
          return Number(Math.min(1.6, Math.max(0.6, prev + delta)).toFixed(2))
        })
      }
    }

    frame.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      frame.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const info = useMemo(() => `Scale ${Math.round(scale * 100)}%`, [scale])

  return (
    <Container>
      <Hint>
        <span>Nested mode with resize/scale controls</span>
        <ScaleIndicator>{info}</ScaleIndicator>
      </Hint>
      <Frame ref={frameRef}>
        <ScaledView scale={scale}>
          <MarkdownDisplay content={content} theme={theme} />
        </ScaledView>
      </Frame>
    </Container>
  )
}
