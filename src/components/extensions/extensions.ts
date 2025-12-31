import { CustomStarterKit } from './StarterKit'
import { CustomHeading } from './Heading'
import { SlashCommand } from './SlashCommand'
import { getSuggestion } from './SlashCommand/suggestion'

export const CustomExtensions = [
  CustomStarterKit,
  CustomHeading,
  SlashCommand.configure({
    suggestion: getSuggestion(),
  }),
]
