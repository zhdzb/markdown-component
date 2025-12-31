import { SlashCommandNodeAttrs, SuggestionItem } from './slashCommand'
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { StyledSlashCommand } from './style'

export interface CommandSuggestionItem extends SuggestionItem {
  icon: string
}

export type SuggestionListProps = SuggestionProps<CommandSuggestionItem, SlashCommandNodeAttrs>

export interface SuggestionListHandle {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean
}

const SuggestionList = forwardRef<SuggestionListHandle, SuggestionListProps>((props, ref) => {
  console.log(props)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (!item) {
      return
    }

    props.command(item)
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))
  return (
    <StyledSlashCommand>
      <div className="tp-suggestion-list">
        {props.items.length > 0 ? (
          props.items.map((item, i) => {
            return (
              <div
                key={i}
                className={`tp-suggestion-item ${i === selectedIndex ? 'tp-suggestion-item-selected' : ''}`}
                onClick={() => props.command(item)}
              >
                <div className="tp-suggestion-icon-wrapper">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                    className="tp-suggestion-icon"
                  />
                </div>
                <div className="tp-suggestion-content">
                  <p className="tp-suggestion-title">{item.title}</p>
                  <span className="tp-suggestion-description">{item.description}</span>
                </div>
              </div>
            )
          })
        ) : (
          <div className="tp-suggestion-empty">No results</div>
        )}
      </div>
    </StyledSlashCommand>
  )
})

export default SuggestionList
