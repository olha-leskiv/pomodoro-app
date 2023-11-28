import { createContext, useState } from 'react'

type Font = {
  name: string
}

const KUMBH_FONT: Font = {
  name: 'kumbh-sans',
}

const ROBOTO_FONT: Font = {
  name: 'roboto-slab',
}

const SPACE_FONT: Font = {
  name: 'space-mono',
}

const fonts = [KUMBH_FONT, ROBOTO_FONT, SPACE_FONT]
const colors = ['red', 'cyan', 'purple']

export const VisualContext = createContext()

export function VisualProvider({ children }) {
  const [activeFont, setActiveFont] = useState(KUMBH_FONT)
  const [activeColor, setActiveColor] = useState('red')

  return (
    <VisualContext.Provider
      value={[activeFont, setActiveFont, activeColor, setActiveColor]}
    >
      {children}
    </VisualContext.Provider>
  )
}
