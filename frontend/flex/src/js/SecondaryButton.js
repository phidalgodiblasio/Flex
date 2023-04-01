import React from 'react'

export default function SecondaryButton({onClick, className, children}) {
  return (
    <button type="button" className={`${className} secondary-button`} onClick={(e) => onClick(e)}>
      <span>{children}</span>
    </button>
  )
}
