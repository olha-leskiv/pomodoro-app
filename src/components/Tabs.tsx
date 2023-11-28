import { useState, useEffect, useContext } from 'react'
import Tab from './Tab'
import { ModeContext } from '../context/ModeContext'

export default function Tabs() {
  const [tabActivePosition, setTabActivePosition] = useState('0')

  const [modeInfo, setModeInfo] = useContext(ModeContext)
  const { activeMode, modes } = modeInfo

  const makeActive = (event: MouseEvent) => {
    let newMode
    for (let mode of modes) {
      if (mode.name === event.currentTarget?.id) newMode = mode
    }
    setModeInfo({ ...modeInfo, activeMode: newMode })
  }

  const renderedTabs = modes.map((mode) => {
    return (
      <Tab
        key={modes.indexOf(mode)}
        tabName={mode.name}
        active={mode === activeMode}
        onClick={makeActive}
      />
    )
  })

  useEffect(() => {
    let tabWidth = document.querySelector('.tab')?.clientWidth
    setTabActivePosition(tabWidth * modes.indexOf(activeMode) + 'px')
  }, [activeMode])

  return (
    <div className="tabs">
      <span
        className="tab-active-bg"
        style={{ left: tabActivePosition }}
      ></span>
      {renderedTabs}
    </div>
  )
}
