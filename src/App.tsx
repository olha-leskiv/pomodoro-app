import { useState, useContext } from 'react'
import './css/styles.css'
import Tabs from './components/Tabs'
import Timer from './components/Timer'
import Settings from './components/Settings'
import cog from './assets/icon-settings.svg'
import { ModeContext } from './context/ModeContext'

export const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  const [modeInfo, setModeInfo] = useContext(ModeContext)
  const { activeFont, activeColor, activeMode, fonts, colors, modes } = modeInfo

  const body = document.querySelector('body')!

  return (
    <div className={`container ${modeInfo.activeColor} ${activeFont.name}`}>
      <p className="logo">pomodoro</p>
      <Tabs />
      <Timer />
      <img
        className="settings-icon"
        src={cog}
        alt="Settings"
        onClick={() => setIsSettingsOpen(true)}
      />

      <Settings
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
      />
    </div>
  )
}
