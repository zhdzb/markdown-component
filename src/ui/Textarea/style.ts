import styled from 'styled-components'

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: fit-content;
  min-height: 200px;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  outline: none;
  overflow: hidden;
  resize: none;

  /* Match CodeBlock styles */
  background-color: rgb(247, 247, 247);
  color: rgb(53, 54, 57);

  .dark & {
    background-color: rgb(17, 24, 39);
    color: rgb(229, 231, 235);
  }

  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: -2px;
  }
`
