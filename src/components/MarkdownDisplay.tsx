import React from 'react';
import styled from 'styled-components';

export interface MarkdownDisplayProps {
  /**
   * Markdown-like content that should be rendered.
   * This component simply exposes the raw HTML so it can be styled in a predictable way.
   */
  content: string;
  /**
   * When true, the component uses a subtle accent to highlight itself.
   */
  highlight?: boolean;
}

const Wrapper = styled.div<{ highlight: boolean }>`
  background: ${({ highlight }) => (highlight ? 'var(--highlight-bg, #f7f2ff)' : 'var(--card-bg, #ffffff)')};
  border: 1px solid var(--border, #e0e0e0);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  box-shadow: 0 8px 24px rgba(15, 15, 15, 0.08);
  transition: transform 0.2s ease, border-color 0.2s ease;
  max-width: 500px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: var(--text, #1c1c1c);

  &:hover {
    border-color: var(--accent, #6b46c1);
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  word-break: break-word;
  & > h1 {
    font-size: 1.3rem;
  }
`;

export const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ content, highlight = false }) => {
  return (
    <Wrapper highlight={highlight}>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
  );
};

