import { css } from 'styled-components'

export const StyledTaskList = css`
  ul[data-type='taskList'] {
    list-style: none;
    padding: 0;

    p {
      margin: 0;
    }

    li {
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }

      ul[data-type='taskList'] {
        margin: 0;
      }
    }
  }
`
