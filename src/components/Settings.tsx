import { useState } from 'react'
import close from '../assets/icon-close.svg'
import { RadioSelector } from './RadioSelector'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

export default function Settings({ isSettingsOpen, setIsSettingsOpen }) {
  const [modeInfo, setModeInfo] = useContext(ModeContext)
  const { activeFont, activeColor, activeMode, fonts, colors, modes } = modeInfo

  const [isFormUpdated, setIsFormUpdated] = useState<boolean>(false)
  const [periodsLength, setPeriodsLength] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
  })
  const [newColor, setNewColor] = useState(activeColor)
  const [newFont, setNewFont] = useState(activeFont)

  const handleClose = () => {
    setIsSettingsOpen(false)
    setIsFormUpdated(false)
    setNewColor(activeColor)
    setNewFont(activeFont)
  }

  const submitNewColor = (color) => {
    setIsFormUpdated(true)
    setNewColor(color)
  }

  const submitNewFont = (font) => {
    setIsFormUpdated(true)
    setNewFont(font)
  }

  const applyChanges = () => {
    setIsSettingsOpen(false)

    if (!isFormUpdated) return

    const updatedModes = modes.map((mode) => {
      if (mode.min === periodsLength[mode.id]) {
        return mode
      } else {
        return { ...mode, min: periodsLength[mode.id] }
      }
    })

    const updatedActiveMode = updatedModes.filter((mode) => {
      if (mode.name === activeMode.name) return mode
    })

    setModeInfo({
      ...modeInfo,
      activeColor: newColor,
      activeFont: newFont,
      modes: updatedModes,
      activeMode: updatedActiveMode[0],
    })
  }

  const handleChange = (e) => {
    const inputID = e.currentTarget.id
    if (inputID === 'pomodoroInput') {
      setIsFormUpdated(true)
      setPeriodsLength({ ...periodsLength, pomodoro: e.currentTarget.value })
    }
    if (inputID === 'shortInput') {
      setIsFormUpdated(true)
      setPeriodsLength({ ...periodsLength, short: e.currentTarget.value })
    }
    if (inputID === 'longInput') {
      setIsFormUpdated(true)
      setPeriodsLength({ ...periodsLength, long: e.currentTarget.value })
    }
  }

  return (
    <div className={`gray ${isSettingsOpen ? '' : 'hidden'}`}>
      <div className="settings">
        <div className="header">
          <h2>Settings</h2>
          <img
            src={close}
            alt="Close"
            onClick={() => {
              handleClose()
            }}
          ></img>
        </div>
        <div className="setting-container">
          <div>
            <h4>TIME (MINUTES)</h4>
            <div className="input-group">
              <label>
                <p className="small">pomodoro</p>
                <input
                  type="number"
                  value={periodsLength.pomodoro}
                  onChange={handleChange}
                  id="pomodoroInput"
                />
              </label>
              <label>
                <p className="small">short break</p>
                <input
                  type="number"
                  value={periodsLength.short}
                  onChange={handleChange}
                  id="shortInput"
                />
              </label>
              <label>
                <p className="small">long break</p>
                <input
                  type="number"
                  value={periodsLength.long}
                  onChange={handleChange}
                  id="longInput"
                />
              </label>
            </div>
          </div>
          <div className="divider"></div>
          <div className="horizontal-group type">
            <h4>FONT</h4>
            <RadioSelector
              itemsNum={3}
              type="font"
              change={submitNewFont}
              currentSelection={newFont}
            />
          </div>
          <div className="divider"></div>
          <div className="horizontal-group">
            <h4>COLOR</h4>
            <RadioSelector
              itemsNum={3}
              type="color"
              change={submitNewColor}
              currentSelection={newColor}
            />
          </div>
        </div>
        <button onClick={applyChanges}>Apply</button>
      </div>
    </div>
  )
}
