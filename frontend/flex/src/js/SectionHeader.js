import React from 'react'

export default function SectionHeader({title, children}) {
  return (
    <header className="section-header">
      <h2>{title}</h2>
      <div>
        {children}
      </div>
    </header>
  )
}
