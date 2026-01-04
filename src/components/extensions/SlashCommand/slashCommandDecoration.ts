import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { slashCommandPluginKey } from './slashCommand'

export const SlashCommandDecoration = Extension.create({
  name: 'slashCommandDecoration',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('slash-command-decoration'),
        props: {
          decorations: state => {
            const slashCommandState = slashCommandPluginKey.getState(state)
            if (!slashCommandState?.active) {
              return DecorationSet.empty
            }

            const { range } = slashCommandState
            if (!range) {
              return DecorationSet.empty
            }

            // Create a decoration for the slash character
            // The range includes the slash and the query text
            // We want to decorate only the slash, which is at the start of the range
            const slashDecoration = Decoration.inline(range.from, range.from + 1, {
              nodeName: 'span',
              class: 'tiptap-slash-decoration',
            })

            return DecorationSet.create(state.doc, [slashDecoration])
          },
        },
      }),
    ]
  },
})
