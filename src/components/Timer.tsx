import { useEffect, useState, useRef, useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { Mode } from '../types/global'

export default function Timer() {
  const [modeInfo, setModeInfo] = useContext<Mode>(ModeContext)
  const { activeFont, activeColor, activeMode, fonts, colors, modes } = modeInfo

  const [strokeDasharray, setStrokeDasharray] = useState(0)

  const [timeLeft, setTimeLeft] = useState<number>(activeMode.min * 60)
  const [strokeDashoffset, setStrokeDashoffset] = useState(
    (timeLeft / 60 / activeMode.min) * strokeDasharray
  )

  const [isPaused, setIsPaused] = useState<boolean>(true)

  const shortBreaks = useRef<number>(0)
  const intervalref = useRef<number | null>(null)

  const startInterval = () => {
    if (intervalref.current !== null) return
    intervalref.current = window.setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1)
    }, 1000)
  }

  const stopInterval = () => {
    if (intervalref.current) {
      window.clearInterval(intervalref.current)
      setTimeLeft(timeLeft)
      intervalref.current = null
    }
  }

  const toggleTimer = () => {
    if (isPaused) {
      startInterval()
    } else {
      stopInterval()
    }

    setIsPaused(!isPaused)
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      let newMode
      if (activeMode.name !== modes[0].name) {
        newMode = modes[0]
      } else if (shortBreaks.current === 3) {
        newMode = modes[2]
        shortBreaks.current = 0
      } else {
        newMode = modes[1]
        shortBreaks.current++
      }
      setModeInfo({ ...modeInfo, activeMode: newMode })
    }
  }, [timeLeft])

  useEffect(() => {
    setTimeLeft(activeMode.min * 60)
  }, [activeMode])

  useEffect(() => {
    return () => {
      if (intervalref.current !== null) {
        window.clearInterval(intervalref.current)
      }
    }
  }, [])

  const renderedTime = formatTime()

  function formatTime() {
    if (timeLeft < 0) return '00:00'
    let minutes: number | string = Math.floor(timeLeft / 60)
    let seconds: number | string = timeLeft % 60
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    return minutes + ':' + seconds
  }

  let buttonText = isPaused ? 'Start' : 'Pause'

  let progressCircle = useRef()
  useEffect(() => {
    let item: SVGGeometryElement = progressCircle.current!
    if (item === null) return
    setStrokeDasharray(Math.floor(item.getTotalLength()))
  }, [])

  useEffect(() => {
    setStrokeDashoffset(
      strokeDasharray - (timeLeft / 60 / activeMode.min) * strokeDasharray
    )
  }, [timeLeft])

  return (
    <div className="timer-outer">
      <div className="timer-inner">
        <svg className={`progress ${activeColor}`}>
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            strokeDasharray={strokeDasharray}
            ref={progressCircle}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <h1>{renderedTime}</h1>
        <button onClick={toggleTimer}>
          <h3>{buttonText}</h3>
        </button>
      </div>
    </div>
  )
}
