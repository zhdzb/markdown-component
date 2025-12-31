import styled from 'styled-components'

export const StyledSlashCommand = styled.div`
  background-color: var(--popover);
  .tp-suggestion-list {
    z-index: 20;
    display: flex;
    flex-direction: column;
    background-color: var(--popover);
    border-radius: calc(var(--radius) - 2px);
    border: 1px solid var(--border);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.25rem;
    max-height: 320px;
    width: 18rem;
    overflow-y: auto;

    > * + * {
      margin-top: 0.25rem;
    }
  }

  .tp-suggestion-item {
    display: flex;
    padding: 0.25rem;
    border-radius: calc(var(--radius) - 2px);
    cursor: pointer;
    color: var(--foreground);
    gap: 0.5rem;

    &:hover {
      background-color: var(--accent);
    }

    &.tp-suggestion-item-selected {
      background-color: var(--accent);
    }
  }

  .tp-suggestion-icon-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    background-color: var(--popover);
    border-radius: calc(var(--radius) - 2px);
  }

  .tp-suggestion-icon {
    width: 1rem;
    height: 1rem;
  }

  .tp-suggestion-content {
    display: flex;
    flex-direction: column;
  }

  .tp-suggestion-title {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .tp-suggestion-description {
    font-size: 0.75rem;
    color: var(--muted-foreground);
  }

  .tp-suggestion-empty {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }
`
