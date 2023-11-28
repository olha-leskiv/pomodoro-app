import { MouseEventHandler } from 'react'

type TabProps = {
  tabName: string
  active?: boolean
  onClick: MouseEventHandler
}

export default function Tab({ tabName, active, onClick }: TabProps) {
  let tabClassName = 'tab'
  if (active) {
    tabClassName = 'tab active'
  }

  return (
    <div className={tabClassName} onClick={onClick} id={tabName}>
      <p className="regular">{tabName}</p>
    </div>
  )
}
