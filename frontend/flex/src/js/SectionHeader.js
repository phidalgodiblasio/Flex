import React from 'react'
import { FaPen, FaTimes } from 'react-icons/fa';

export default function SectionHeader({title, edit, editing}) {

  let buttonIcon = editing ? <FaTimes /> : <FaPen />;

  return (
    <header className="section-header">
      <h2>{title}</h2>
      <div>
        <button className="transparent-button" onClick={() => edit()}>
          {buttonIcon}
        </button>
      </div>
    </header>
  )
}
