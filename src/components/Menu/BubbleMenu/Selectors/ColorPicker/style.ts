import styled from 'styled-components'

export const StyledColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* space-y-3 */
  padding: 0.5rem;

  .section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .section-title {
    font-size: 0.75rem; /* text-xs */
    font-weight: 500;
    color: #6b7280; /* text-gray-500 */
    padding-left: 0.25rem;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
  }

  .color-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem; /* w-7 */
    height: 1.75rem; /* h-7 */
    border-radius: 0.375rem; /* rounded-md */
    border: 1px solid transparent;
    cursor: pointer;
    background: transparent;
    transition: all 0.2s;
    padding: 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &.is-active {
      background-color: rgba(0, 0, 0, 0.1);
      border-color: rgba(0, 0, 0, 0.2);
    }
  }

  .text-preview {
    font-size: 1rem;
    font-weight: 500;
  }

  .highlight-preview {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    position: relative;

    &.has-border {
      border: 1px solid #e5e7eb;
    }
  }

  .no-color-line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 100%;
    height: 1px;
    background-color: #ef4444;
  }
`
