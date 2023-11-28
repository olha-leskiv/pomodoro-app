import { createContext, useEffect, useState } from 'react'
import { Mode, Font } from '../types/global'

let POMODORO: Mode = {
  name: 'pomodoro',
  id: 'pomodoro',
  min: 25,
}

let SHORTBREAK: Mode = {
  name: 'short break',
  id: 'short',
  min: 5,
}

let LONGBREAK: Mode = {
  name: 'long break',
  id: 'long',
  min: 15,
}

const modes: Mode[] = [POMODORO, SHORTBREAK, LONGBREAK]

export const ModeContext = createContext(POMODORO)

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

export function Provider({ children }: any) {
  const [modeInfo, setModeInfo] = useState({
    activeMode: POMODORO,
    activeFont: KUMBH_FONT,
    activeColor: 'cyan',
    modes: modes,
    fonts: fonts,
    colors: colors,
  })

  return (
    <ModeContext.Provider value={[modeInfo, setModeInfo]}>
      {children}
    </ModeContext.Provider>
  )
}
