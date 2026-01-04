import React from 'react'
import { StyledTextPreview, StyledHighlightPreview } from './style'

interface TextColorPreviewProps {
  color: string
}

export const TextColorPreview = ({ color }: TextColorPreviewProps) => {
  return <StyledTextPreview style={{ color: color || '#000' }}>A</StyledTextPreview>
}

interface HighlightColorPreviewProps {
  color: string
}

export const HighlightColorPreview = ({ color }: HighlightColorPreviewProps) => {
  return (
    <StyledHighlightPreview style={{ backgroundColor: color || 'transparent' }} $hasBorder={!color}>
      {!color && <div className="no-color-line" />}
    </StyledHighlightPreview>
  )
}
