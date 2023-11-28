import { useContext, useState } from 'react'
import { ModeContext } from '../context/ModeContext'

export function RadioSelector({ itemsNum, type, change, currentSelection }) {
  const [modeInfo, setModeInfo] = useContext(ModeContext)
  const { activeFont, activeColor, fonts, colors } = modeInfo

  let items = []

  for (let i = 0; i < itemsNum; i++) {
    if (type === 'font') {
      items.push(
        <div
          className={`radio font ${fonts[i].name} ${
            fonts[i] === currentSelection ? 'active' : ''
          }`}
          key={i}
          onClick={() => change(fonts[i])}
        >
          Aa
        </div>
      )
    }
    if (type === 'color') {
      items.push(
        <div
          className={`radio color ${colors[i]} ${
            colors[i] === currentSelection ? 'active' : ''
          }`}
          key={i}
          onClick={() => change(colors[i])}
        ></div>
      )
    }
  }

  return <div className="radio-group">{items}</div>
}
