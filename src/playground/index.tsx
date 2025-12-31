import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/global.css'
import { PlaygroundApp } from './PlaygroundApp'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(<PlaygroundApp />)
} else {
  console.error('Missing #root container for playground.')
}
